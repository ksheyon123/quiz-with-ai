// ThreeCanvas.js
import React, { RefObject, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const ThreeCanvas = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!isMounted) setIsMounted(true)
    }, [isMounted]);

    useEffect(() => {
        if(isMounted) {
            // 씬 생성
            const scene = new THREE.Scene();

            // 카메라 생성
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 5;

            // 렌더러 생성
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            mountRef.current!.appendChild(renderer.domElement);

            // 애니메이션 루프
            const animate = () => {
                requestAnimationFrame(animate);
                renderer.render(scene, camera);
            };
            animate()

            // 컴포넌트 언마운트 시 정리
            return () => {
                mountRef.current!.removeChild(renderer.domElement);
                renderer.dispose();
            };
        }
        
    }, [isMounted]);

    return <div ref={mountRef as RefObject<HTMLDivElement>} />;
};

export default ThreeCanvas;