import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

function FallingStars() {
  const canvasRef = useRef();
  const sceneRef = useRef();
  const rendererRef = useRef();
  const cameraRef = useRef();
  const starsRef = useRef([]);
  const animationIdRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a1a);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 50);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    // Create star geometry and material
    const starGeometry = new THREE.SphereGeometry(0.1, 6, 6);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Create falling stars
    const stars = [];
    const numStars = 50;

    for (let i = 0; i < numStars; i++) {
      const star = new THREE.Mesh(starGeometry, starMaterial.clone());
      
      // Random starting position
      star.position.x = (Math.random() - 0.5) * 100;
      star.position.y = Math.random() * 50 + 30;
      star.position.z = (Math.random() - 0.5) * 30;
      
      // Random fall speed and angle
      star.userData = {
        fallSpeed: Math.random() * 0.3 + 0.1,
        angleSpeed: Math.random() * 0.02 + 0.01,
        initialX: star.position.x,
        brightness: Math.random() * 0.5 + 0.5
      };
      
      // Random star color (white to yellow)
      star.material.color.setHSL(0.15, Math.random() * 0.3, star.userData.brightness);
      
      scene.add(star);
      stars.push(star);
    }
    
    starsRef.current = stars;

    // Animation loop
    function animate() {
      animationIdRef.current = requestAnimationFrame(animate);
      
      stars.forEach((star) => {
        // Fall down with angle
        star.position.y -= star.userData.fallSpeed;
        star.position.x += star.userData.angleSpeed;
        
        // Add some sparkle effect
        const time = Date.now() * 0.005;
        star.material.opacity = 0.7 + Math.sin(time + star.position.x) * 0.3;
        
        // Reset star when it falls below view
        if (star.position.y < -30) {
          star.position.y = Math.random() * 20 + 30;
          star.position.x = star.userData.initialX + (Math.random() - 0.5) * 20;
          star.position.z = (Math.random() - 0.5) * 30;
        }
        
        // Wrap around horizontally
        if (star.position.x > 50) {
          star.position.x = -50;
          star.userData.initialX = star.position.x;
        }
      });
      
      renderer.render(scene, camera);
    }
    
    animate();

    // Handle window resize
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      stars.forEach(star => {
        scene.remove(star);
        star.geometry.dispose();
        star.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-900">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0"
        style={{ width: "100vw", height: "100vh",position:"absolute" }}
      />
      <div className="absolute top-4 left-4 text-white text-lg font-light z-10">
        Falling Stars ✨
      </div>
    </div>
  );
}

export default FallingStars;