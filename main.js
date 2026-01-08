import * as THREE from 'three';

// Global variables
let camera, scene, renderer, gl;
let controller;
let reticle;
let hitTestSource = null;
let hitTestSourceRequested = false;
let placedObjects = [];

// UI Elements
const arButton = document.getElementById('ar-button');
const statusText = document.getElementById('status');

// Initialize the app
init();

function init() {
    // Check for WebXR support
    if ('xr' in navigator) {
        navigator.xr.isSessionSupported('immersive-ar').then((supported) => {
            if (supported) {
                statusText.textContent = 'AR Ready!';
                arButton.disabled = false;
                arButton.addEventListener('click', onARButtonClick);
            } else {
                statusText.textContent = 'AR not supported on this device';
                statusText.innerHTML += '<br><small>Requires Android device with ARCore support</small>';
            }
        }).catch((error) => {
            console.error('WebXR error:', error);
            statusText.textContent = 'Error checking AR support';
            statusText.innerHTML += '<br><small>' + error.message + '</small>';
        });
    } else {
        statusText.textContent = 'WebXR not available';
        statusText.innerHTML += '<br><small>Please use Chrome or Edge on Android</small>';
    }

    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

    // Create renderer
    renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true 
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    document.body.appendChild(renderer.domElement);

    // Add lights
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    // Create reticle (target indicator)
    const reticleGeometry = new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI / 2);
    const reticleMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00ff88,
        side: THREE.DoubleSide
    });
    reticle = new THREE.Mesh(reticleGeometry, reticleMaterial);
    reticle.matrixAutoUpdate = false;
    reticle.visible = false;
    scene.add(reticle);

    // Add controller for tap events
    controller = renderer.xr.getController(0);
    controller.addEventListener('select', onSelect);
    scene.add(controller);

    // Handle window resize
    window.addEventListener('resize', onWindowResize);
}

function onARButtonClick() {
    const sessionInit = {
        requiredFeatures: ['hit-test'],
        optionalFeatures: ['dom-overlay'],
        domOverlay: { root: document.body }
    };

    navigator.xr.requestSession('immersive-ar', sessionInit).then(onSessionStarted);
}

function onSessionStarted(session) {
    session.addEventListener('end', onSessionEnded);

    renderer.xr.setReferenceSpaceType('local');
    renderer.xr.setSession(session);

    document.body.classList.add('ar-active');

    // Start render loop
    renderer.setAnimationLoop(render);
}

function onSessionEnded() {
    document.body.classList.remove('ar-active');
    hitTestSourceRequested = false;
    hitTestSource = null;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onSelect() {
    if (reticle.visible) {
        // Create a new object at the reticle position
        const object = createGameObject();
        object.position.setFromMatrixPosition(reticle.matrix);
        object.quaternion.setFromRotationMatrix(reticle.matrix);
        scene.add(object);
        placedObjects.push(object);
    }
}

function createGameObject() {
    // Create a simple dice as an example game object
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshStandardMaterial({ 
        color: Math.random() * 0xffffff,
        roughness: 0.7,
        metalness: 0.3
    });
    const mesh = new THREE.Mesh(geometry, material);

    // Add edges for better visibility
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(
        edges, 
        new THREE.LineBasicMaterial({ color: 0x000000 })
    );
    mesh.add(line);

    return mesh;
}

function render(timestamp, frame) {
    if (frame) {
        const referenceSpace = renderer.xr.getReferenceSpace();
        const session = renderer.xr.getSession();

        // Request hit test source
        if (hitTestSourceRequested === false) {
            session.requestReferenceSpace('viewer').then((referenceSpace) => {
                session.requestHitTestSource({ space: referenceSpace }).then((source) => {
                    hitTestSource = source;
                });
            });

            session.addEventListener('end', () => {
                hitTestSourceRequested = false;
                hitTestSource = null;
            });

            hitTestSourceRequested = true;
        }

        // Perform hit test
        if (hitTestSource) {
            const hitTestResults = frame.getHitTestResults(hitTestSource);

            if (hitTestResults.length > 0) {
                const hit = hitTestResults[0];
                const pose = hit.getPose(referenceSpace);

                reticle.visible = true;
                reticle.matrix.fromArray(pose.transform.matrix);
            } else {
                reticle.visible = false;
            }
        }

        // Animate placed objects (simple rotation)
        placedObjects.forEach((obj) => {
            obj.rotation.y += 0.01;
        });
    }

    renderer.render(scene, camera);
}
