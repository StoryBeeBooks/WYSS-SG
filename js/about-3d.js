import * as THREE from 'https://unpkg.com/three@0.158.0/build/three.module.js';

// Simple interactive 3D timeline: three project cards that can be rotated and clicked.
export default function initAboutTimeline(containerId, infoId) {
    const container = document.getElementById(containerId);
    const infoPanel = document.getElementById(infoId);
    if (!container || !infoPanel) return;

    const projects = [
        {
            title: 'Nanjing Greenland Zifeng Tower',
            subtitle: 'Supertall building HVAC integration',
            details: 'High‑rise chilled water and cooling tower integration for a signature mixed‑use tower.'
        },
        {
            title: 'Waigaoqiao Agricultural Bank Data Center',
            subtitle: 'Mission-critical data center cooling',
            details: 'Precision cooling and redundancy design for an enterprise data center deployment.'
        },
        {
            title: 'Shanghai Center Cooling Project',
            subtitle: 'Central plant & thermal storage',
            details: 'Large-scale cooling plant with thermal energy storage and lifecycle performance services.'
        }
    ];

    // THREE.js scene setup
    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting
    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.9);
    hemi.position.set(0, 1, 0);
    scene.add(hemi);

    const dir = new THREE.DirectionalLight(0xffffff, 0.6);
    dir.position.set(5, 10, 7);
    scene.add(dir);

    // Create group of cards
    const group = new THREE.Group();
    scene.add(group);

    const cardWidth = 1.2, cardHeight = 0.7;
    const spacing = 1.8;

    // helper: create canvas texture with title/subtitle
    function makeCardTexture(title, subtitle) {
        const cvs = document.createElement('canvas');
        cvs.width = 1024; cvs.height = 512;
        const ctx = cvs.getContext('2d');
        // background
        ctx.fillStyle = '#1f2937';
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        // title
        ctx.fillStyle = '#ffffff';
        ctx.font = '48px serif';
        ctx.fillText(title, 40, 140);
        // subtitle
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '28px sans-serif';
        ctx.fillText(subtitle, 40, 200);
        // subtle accent
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(40, 240, 180, 8);
        const tex = new THREE.CanvasTexture(cvs);
        tex.needsUpdate = true;
        return tex;
    }

    const cards = [];
    projects.forEach((p, i) => {
        const geom = new THREE.PlaneGeometry(cardWidth, cardHeight);
        const mat = new THREE.MeshStandardMaterial({ map: makeCardTexture(p.title, p.subtitle), side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(geom, mat);
        mesh.position.x = (i - (projects.length - 1) / 2) * spacing;
        mesh.userData = { index: i };
        group.add(mesh);
        cards.push(mesh);
    });

    // Raycaster for clicks
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    function onPointerDown(event) {
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObjects(cards);
        if (intersects.length) {
            const idx = intersects[0].object.userData.index;
            showProject(idx);
        }
    }

    renderer.domElement.addEventListener('pointerdown', onPointerDown);

    // simple drag to rotate
    let isDown = false, startX = 0, startRot = 0;
    renderer.domElement.addEventListener('pointerdown', (e) => { isDown = true; startX = e.clientX; startRot = group.rotation.y; });
    window.addEventListener('pointerup', () => { isDown = false; });
    window.addEventListener('pointermove', (e) => {
        if (!isDown) return;
        const dx = (e.clientX - startX) / 400; // sensitivity
        group.rotation.y = startRot + dx;
    });

    function showProject(index) {
        const p = projects[index];
        infoPanel.querySelector('.proj-title').textContent = p.title;
        infoPanel.querySelector('.proj-sub').textContent = p.subtitle;
        infoPanel.querySelector('.proj-details').textContent = p.details;
    }

    // initial selection
    showProject(0);

    // animate
    function animate() {
        requestAnimationFrame(animate);
        // gentle auto-rotation
        group.rotation.y += 0.001;
        renderer.render(scene, camera);
    }
    animate();

    // handle resize
    function onResize() {
        const w = container.clientWidth; const h = container.clientHeight;
        camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
    }
    window.addEventListener('resize', onResize);
}
