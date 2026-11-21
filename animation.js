/* -------------------------------------------------------------
       1. Theme Switcher Logic
       ------------------------------------------------------------- */
    const themeBtn = document.getElementById('themeBtn');
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');
    const htmlEl = document.documentElement;

    themeBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      if (currentTheme === 'dark') {
        htmlEl.setAttribute('data-theme', 'light');
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Dark Mode';
      } else {
        htmlEl.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Light Mode';
      }
    });

    /* -------------------------------------------------------------
       2. Copy Code to Clipboard Helper
       ------------------------------------------------------------- */
    function copyCode(elementId, btn) {
      const el = document.getElementById(elementId);
      if (!el) return;
      const text = el.innerText || el.textContent;
      navigator.clipboard.writeText(text).then(() => {
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.borderColor = 'var(--green)';
        btn.style.color = 'var(--green)';
        setTimeout(() => {
          btn.textContent = orig;
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 1800);
      });
    }

    /* -------------------------------------------------------------
       3. Active State for Horizontal Navigation on Scroll & Header Sync
       ------------------------------------------------------------- */
    const navItems = document.querySelectorAll('.horizontal-nav .nav-item');
    const trackedSections = document.querySelectorAll('section[id]');

    function syncNavOffset() {
      const header = document.querySelector('header');
      const nav = document.getElementById('topNav');
      if (header && nav) {
        nav.style.top = header.offsetHeight + 'px';
      }
    }
    window.addEventListener('resize', syncNavOffset);
    window.addEventListener('DOMContentLoaded', syncNavOffset);

    function updateNavScrollSpy() {
      let currentSection = 'cover';
      const scrollPos = window.pageYOffset + 170;

      if (window.pageYOffset > 100) {
        trackedSections.forEach(sec => {
          const top = sec.offsetTop;
          const height = sec.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            currentSection = sec.getAttribute('id');
          }
        });
      }

      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === '#' + currentSection) {
          item.classList.add('active');
          const container = document.querySelector('.nav-container');
          if (container) {
            const itemLeft = item.offsetLeft;
            const itemWidth = item.offsetWidth;
            const containerLeft = container.scrollLeft;
            const containerWidth = container.offsetWidth;
            if (itemLeft < containerLeft || (itemLeft + itemWidth) > (containerLeft + containerWidth)) {
              container.scrollTo({
                left: Math.max(0, itemLeft - 20),
                behavior: 'smooth'
              });
            }
          }
        }
      });
    }

    window.addEventListener('scroll', updateNavScrollSpy);
    window.addEventListener('load', () => {
      syncNavOffset();
      updateNavScrollSpy();
    });

    /* -------------------------------------------------------------
       4. Generic Video Controller Setup Helper
       ------------------------------------------------------------- */
    function setupVideoController(videoEl, playBtn, stopBtn, restartBtn, muteBtn, sliderEl, timeEl) {
      if (!videoEl) return;
      videoEl.muted = true;

      function formatTime(s) {
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60);
        return m + ":" + (sec < 10 ? "0" + sec : sec);
      }

      playBtn.addEventListener('click', () => {
        if (videoEl.paused) {
          videoEl.play();
          playBtn.textContent = '⏸ Pause';
        } else {
          videoEl.pause();
          playBtn.textContent = '▶ Play';
        }
      });

      stopBtn.addEventListener('click', () => {
        videoEl.pause();
        videoEl.currentTime = 0;
        playBtn.textContent = '▶ Play';
      });

      restartBtn.addEventListener('click', () => {
        videoEl.currentTime = 0;
        videoEl.play();
        playBtn.textContent = '⏸ Pause';
      });

      muteBtn.addEventListener('click', () => {
        videoEl.muted = !videoEl.muted;
        muteBtn.textContent = videoEl.muted ? '🔇 Sound Off' : '🔊 Sound On';
      });

      videoEl.addEventListener('timeupdate', () => {
        if (!isNaN(videoEl.duration) && videoEl.duration > 0) {
          const pct = (videoEl.currentTime / videoEl.duration) * 100;
          sliderEl.value = pct;
          timeEl.textContent = formatTime(videoEl.currentTime) + ' / ' + formatTime(videoEl.duration);
        }
      });

      sliderEl.addEventListener('input', () => {
        if (!isNaN(videoEl.duration)) {
          videoEl.currentTime = (sliderEl.value / 100) * videoEl.duration;
        }
      });
    }

    // Task 1 Video Controller
    setupVideoController(
      document.getElementById('videoTask1'),
      document.getElementById('t1PlayBtn'),
      document.getElementById('t1StopBtn'),
      document.getElementById('t1RestartBtn'),
      document.getElementById('t1MuteBtn'),
      document.getElementById('t1Slider'),
      document.getElementById('t1Time')
    );

    // Section D Q11 Video Controller
    setupVideoController(
      document.getElementById('videoQ11'),
      document.getElementById('q11PlayBtn'),
      document.getElementById('q11StopBtn'),
      document.getElementById('q11RestartBtn'),
      document.getElementById('q11MuteBtn'),
      document.getElementById('q11Slider'),
      document.getElementById('q11Time')
    );

    /* -------------------------------------------------------------
       5. Task 2: Multithreading Code Run Simulation
       ------------------------------------------------------------- */
    const t2RunBtn = document.getElementById('t2RunBtn');
    const t2TermBody = document.getElementById('t2TermBody');
    const t2Status = document.getElementById('t2Status');

    const threadOutputLines = [
      "<span class='prompt'>$</span> <span class='cmd'>python multithread_demo.py</span>",
      "<span class='output'>[Main] Spawning 3 concurrent threads in process space...</span>",
      "<span class='highlight'>[Thread-1] Number:   1</span>",
      "<span style='color:#38bdf8'>[Thread-2] Alphabet: A</span>",
      "<span style='color:#22c55e'>[Thread-3] Square:   1² = 1</span>",
      "<span class='highlight'>[Thread-1] Number:   2</span>",
      "<span style='color:#38bdf8'>[Thread-2] Alphabet: B</span>",
      "<span style='color:#22c55e'>[Thread-3] Square:   2² = 4</span>",
      "<span class='highlight'>[Thread-1] Number:   3</span>",
      "<span style='color:#38bdf8'>[Thread-2] Alphabet: C</span>",
      "<span style='color:#22c55e'>[Thread-3] Square:   3² = 9</span>",
      "<span class='highlight'>[Thread-1] Number:   4</span>",
      "<span style='color:#38bdf8'>[Thread-2] Alphabet: D</span>",
      "<span style='color:#22c55e'>[Thread-3] Square:   4² = 16</span>",
      "<span class='highlight'>[Thread-1] Number:   5</span>",
      "<span style='color:#38bdf8'>[Thread-2] Alphabet: E</span>",
      "<span style='color:#22c55e'>[Thread-3] Square:   5² = 25</span>",
      "<span class='output'>... [Interleaved context switching active] ...</span>",
      "<span class='highlight'>[Thread-1] Number:   10</span>",
      "<span style='color:#38bdf8'>[Thread-2] Alphabet: J</span>",
      "<span style='color:#22c55e'>[Thread-3] Square:   10² = 100</span>",
      "<span class='success'>[Main] Thread 1, 2, and 3 joined successfully. Exit code: 0</span>"
    ];

    t2RunBtn.addEventListener('click', () => {
      t2RunBtn.disabled = true;
      t2Status.textContent = 'Running...';
      t2Status.style.color = '#fbbf24';
      t2TermBody.innerHTML = '';
      let i = 0;
      const interval = setInterval(() => {
        if (i < threadOutputLines.length) {
          t2TermBody.innerHTML += threadOutputLines[i] + "\n";
          t2TermBody.scrollTop = t2TermBody.scrollHeight;
          i++;
        } else {
          clearInterval(interval);
          t2Status.textContent = 'Success (0)';
          t2Status.style.color = '#22c55e';
          t2RunBtn.disabled = false;
        }
      }, 70);
    });

    /* -------------------------------------------------------------
       6. Section B: Linux Commands Runner & Next Button Switcher
       ------------------------------------------------------------- */
    const secBCommands = [
      {
        name: "pwd (Print Working Directory)",
        cmd: "pwd",
        desc: "Displays the current absolute directory path.",
        out: "/home/student"
      },
      {
        name: "ls -l (Detailed Directory Listing)",
        cmd: "ls -l",
        desc: "Lists files with permissions, links, owner, size & timestamp.",
        out: "total 16\ndrwxr-xr-x 2 student student 4096 Oct 26 10:15 BCA\n-rw-r--r-- 1 student student  142 Oct 26 10:20 capital.txt\n-rw-r--r-- 1 student student  318 Oct 26 10:12 student.txt"
      },
      {
        name: "touch (Create Empty File)",
        cmd: "touch student.txt",
        desc: "Generates an empty 0-byte file or refreshes timestamp.",
        out: "# Created /home/student/student.txt (inode allocated, 0 bytes)"
      },
      {
        name: "mkdir (Create Directory)",
        cmd: "mkdir BCA",
        desc: "Creates a new subdirectory folder in the working directory.",
        out: "# Created directory /home/student/BCA (mode: 0755 drwxr-xr-x)"
      },
      {
        name: "cat (Display Contents)",
        cmd: "cat student.txt",
        desc: "Reads and outputs file contents directly to terminal.",
        out: "Name: Makwana Tusharbhai Shantibhai\nURN:  E26M02F2221\nClass: MCA(FY) - AIDS\nCollege: Ajeenkya DY Patil University, Pune"
      },
      {
        name: "cd (Change Directory)",
        cmd: "cd /home/student/BCA && pwd",
        desc: "Navigates between directories in the filesystem hierarchy.",
        out: "/home/student/BCA"
      },
      {
        name: "cp (Copy File)",
        cmd: "cp student.txt backup.txt && ls -l backup.txt",
        desc: "Duplicates a file or directory tree to destination path.",
        out: "-rw-r--r-- 1 student student 318 Oct 26 10:30 backup.txt"
      },
      {
        name: "mv (Move / Rename)",
        cmd: "mv student.txt details.txt && ls -l details.txt",
        desc: "Relocates or renames files without copying data blocks.",
        out: "-rw-r--r-- 1 student student 318 Oct 26 10:32 details.txt"
      },
      {
        name: "rm (Remove File)",
        cmd: "rm old_temp.txt",
        desc: "Unlinks file inode and permanently deletes file from disk.",
        out: "# File 'old_temp.txt' successfully unlinked and storage freed"
      },
      {
        name: "wc -l (Word & Line Count)",
        cmd: "wc -l student.txt",
        desc: "Counts total lines (-l), words (-w), and bytes (-c).",
        out: "10 student.txt"
      },
      {
        name: "find (File Hierarchy Search)",
        cmd: "find . -type f -name \"*.txt\"",
        desc: "Crawls filesystem tree matching filenames and criteria.",
        out: "./student.txt\n./capital.txt\n./backup.txt"
      },
      {
        name: "grep (Pattern Matching)",
        cmd: "grep -n \"MCA\" student.txt",
        desc: "Searches file contents for matching string patterns with line numbers.",
        out: "3:Class: MCA(FY) - AIDS"
      }
    ];

    let currentSecBIndex = 0;
    const secBCmdHeader = document.getElementById('secBCmdHeader');
    const secBCmdDisplay = document.getElementById('secBCmdDisplay');
    const secBCmdDesc = document.getElementById('secBCmdDesc');
    const secBRunningCmd = document.getElementById('secBRunningCmd');
    const secBOutputDisplay = document.getElementById('secBOutputDisplay');
    const secBStatus = document.getElementById('secBStatus');
    const secBRunBtn = document.getElementById('secBRunBtn');
    const secBNextBtn = document.getElementById('secBNextBtn');
    const secBPrevBtn = document.getElementById('secBPrevBtn');

    function updateSecBCommand(idx) {
      currentSecBIndex = idx;
      const item = secBCommands[currentSecBIndex];
      secBCmdHeader.textContent = `Active Command (${currentSecBIndex + 1}/${secBCommands.length}): ${item.name}`;
      secBCmdDisplay.textContent = item.cmd;
      secBCmdDesc.textContent = item.desc;
      secBRunningCmd.textContent = item.cmd;
      secBOutputDisplay.textContent = item.out;
      secBStatus.textContent = 'Ready';
      secBStatus.style.color = '#22c55e';
    }

    secBNextBtn.addEventListener('click', () => {
      let nextIdx = (currentSecBIndex + 1) % secBCommands.length;
      updateSecBCommand(nextIdx);
    });

    secBPrevBtn.addEventListener('click', () => {
      let prevIdx = (currentSecBIndex - 1 + secBCommands.length) % secBCommands.length;
      updateSecBCommand(prevIdx);
    });

    secBRunBtn.addEventListener('click', () => {
      secBStatus.textContent = 'Executing...';
      secBStatus.style.color = '#fbbf24';
      secBOutputDisplay.textContent = 'Running...';
      setTimeout(() => {
        secBOutputDisplay.textContent = secBCommands[currentSecBIndex].out;
        secBStatus.textContent = 'Exit Code 0';
        secBStatus.style.color = '#22c55e';
      }, 250);
    });

    /* -------------------------------------------------------------
       7. Section C: Animated Run Code (Q9 & Q10)
       ------------------------------------------------------------- */
    // Q9 Runner
    const q9RunBtn = document.getElementById('q9RunBtn');
    const q9TermBody = document.getElementById('q9TermBody');
    const q9Status = document.getElementById('q9Status');
    const q9Lines = [
      "<span class='prompt'>student@adypu-linux:~$</span> <span class='cmd'>cat student.txt</span>",
      "==================================================",
      "              STUDENT PROFILE RECORD",
      "==================================================",
      "<span class='highlight'>Name:</span>         Makwana Tusharbhai Shantibhai",
      "<span class='highlight'>URN Number:</span>   E26M02F2221",
      "<span class='highlight'>Program:</span>      MCA(FY) - AIDS",
      "<span class='highlight'>Faculty:</span>      Indu Kumari",
      "<span class='highlight'>College:</span>      Ajeenkya DY Patil University, Pune",
      "<span class='highlight'>Academic Year:</span> 2026 – 2027",
      "==================================================",
      "<span class='success'>student.txt (END) &mdash; Exit Code 0 [Success]</span>"
    ];

    q9RunBtn.addEventListener('click', () => {
      q9RunBtn.disabled = true;
      q9Status.textContent = 'Reading...';
      q9Status.style.color = '#fbbf24';
      q9TermBody.innerHTML = '';
      let i = 0;
      const interval = setInterval(() => {
        if (i < q9Lines.length) {
          q9TermBody.innerHTML += q9Lines[i] + "\n";
          i++;
        } else {
          clearInterval(interval);
          q9Status.textContent = 'Done (0)';
          q9Status.style.color = '#22c55e';
          q9RunBtn.disabled = false;
        }
      }, 70);
    });

    // Q10 Runner
    const q10RunBtn = document.getElementById('q10RunBtn');
    const q10TermBody = document.getElementById('q10TermBody');
    const q10Status = document.getElementById('q10Status');
    const q10Lines = [
      "<span class='prompt'>student@adypu-linux:~$</span> <span class='cmd'>cat capital.txt</span>",
      "1. Maharashtra - Mumbai",
      "2. Karnataka - Bengaluru",
      "3. Tamil Nadu - Chennai",
      "4. Gujarat - Gandhinagar",
      "5. Rajasthan - Jaipur",
      "6. Kerala - Thiruvananthapuram",
      "7. Punjab - Chandigarh",
      "8. West Bengal - Kolkata",
      "9. Uttar Pradesh - Lucknow",
      "10. Goa - Panaji",
      "",
      "<span class='prompt'>student@adypu-linux:~$</span> <span class='cmd'>find ~ -name 'capital.txt'</span>",
      "<span class='success'>/home/student/capital.txt</span>",
      "",
      "<span class='prompt'>student@adypu-linux:~$</span> <span class='cmd'>grep -n 'Maharashtra' capital.txt</span>",
      "<span class='highlight'>1:1. Maharashtra - Mumbai</span>",
      "",
      "<span class='prompt'>student@adypu-linux:~$</span> <span class='cmd'>wc -l capital.txt</span>",
      "<span class='success'>10 capital.txt</span>"
    ];

    q10RunBtn.addEventListener('click', () => {
      q10RunBtn.disabled = true;
      q10Status.textContent = 'Running...';
      q10Status.style.color = '#fbbf24';
      q10TermBody.innerHTML = '';
      let i = 0;
      const interval = setInterval(() => {
        if (i < q10Lines.length) {
          q10TermBody.innerHTML += q10Lines[i] + "\n";
          i++;
        } else {
          clearInterval(interval);
          q10Status.textContent = 'Verified (0)';
          q10Status.style.color = '#22c55e';
          q10RunBtn.disabled = false;
        }
      }, 60);
    });

    /* -------------------------------------------------------------
       8. Section D: Q13 Diagnostic Toolchain Runner
       ------------------------------------------------------------- */
    const q13RunBtn = document.getElementById('q13RunBtn');
    const q13TermBody = document.getElementById('q13TermBody');
    const q13Status = document.getElementById('q13Status');
    const q13Lines = [
      "<span class='prompt'>student@adypu-linux:~$</span> <span class='cmd'>whoami</span>",
      "<span class='highlight'>student</span>",
      "",
      "<span class='prompt'>student@adypu-linux:~$</span> <span class='cmd'>pwd</span>",
      "<span class='highlight'>/home/student</span>",
      "",
      "<span class='prompt'>student@adypu-linux:~$</span> <span class='cmd'>find / -type f -name 'report.txt' 2&gt;/dev/null</span>",
      "<span class='success'>/home/student/documents/report.txt</span>",
      "",
      "<span class='prompt'>student@adypu-linux:~$</span> <span class='cmd'>ls -l /home/student/documents/report.txt</span>",
      "<span class='success'>-rw-r--r-- 1 student student 124 Oct 26 12:00 /home/student/documents/report.txt</span>",
      "<span class='output'>[Diagnostic Audit Complete: Target file located. Read/write authorized.]</span>"
    ];

    q13RunBtn.addEventListener('click', () => {
      q13RunBtn.disabled = true;
      q13Status.textContent = 'Searching...';
      q13Status.style.color = '#fbbf24';
      q13TermBody.innerHTML = '';
      let i = 0;
      const interval = setInterval(() => {
        if (i < q13Lines.length) {
          q13TermBody.innerHTML += q13Lines[i] + "\n";
          i++;
        } else {
          clearInterval(interval);
          q13Status.textContent = 'Completed (0)';
          q13Status.style.color = '#22c55e';
          q13RunBtn.disabled = false;
        }
      }, 80);
    });

    /* -------------------------------------------------------------
       9. GSAP ScrollTrigger Animations (Slow Scroll Reveal)
       ------------------------------------------------------------- */
    window.addEventListener('DOMContentLoaded', () => {
      if (typeof gsap !== 'undefined') {
        if (typeof ScrollTrigger !== 'undefined') {
          gsap.registerPlugin(ScrollTrigger);

          gsap.utils.toArray('.section-card').forEach((card) => {
            gsap.from(card, {
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
              },
              y: 40,
              opacity: 0,
              duration: 0.8,
              ease: 'power2.out'
            });
          });

          gsap.utils.toArray('.gsap-reveal').forEach((el) => {
            gsap.from(el, {
              scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                toggleActions: 'play none none none'
              },
              y: 30,
              opacity: 0,
              duration: 0.7,
              ease: 'power2.out'
            });
          });
        }
      }
    });

    /* -------------------------------------------------------------
       10. Three.js: 3D OS Architecture in Section A
       ------------------------------------------------------------- */
    (function initOS3D() {
      const container = document.getElementById('os3dContainer');
      if (!container || typeof THREE === 'undefined') return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
      camera.position.set(0, 0, 16);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      const ringGroup = new THREE.Group();
      scene.add(ringGroup);

      const ringColors = [0xef4444, 0xf59e0b, 0x10b981, 0x38bdf8];
      const ringRadii = [2.2, 3.8, 5.2, 6.8];

      ringRadii.forEach((rad, idx) => {
        const ringGeo = new THREE.TorusGeometry(rad, 0.06, 16, 100);
        const ringMat = new THREE.MeshBasicMaterial({ color: ringColors[idx], transparent: true, opacity: 0.75 });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2.5;
        ringMesh.rotation.y = idx * 0.2;
        ringGroup.add(ringMesh);

        for (let j = 0; j < 4; j++) {
          const sphereGeo = new THREE.SphereGeometry(0.18, 16, 16);
          const sphereMat = new THREE.MeshBasicMaterial({ color: ringColors[idx] });
          const sphere = new THREE.Mesh(sphereGeo, sphereMat);
          const angle = (j / 4) * Math.PI * 2;
          sphere.position.set(Math.cos(angle) * rad, 0, Math.sin(angle) * rad);
          ringMesh.add(sphere);
        }
      });

      const coreGeo = new THREE.IcosahedronGeometry(1.2, 2);
      const coreMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        wireframe: true,
        emissive: 0x0284c7,
        emissiveIntensity: 0.6
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      scene.add(coreMesh);

      const pLight = new THREE.PointLight(0x38bdf8, 2, 50);
      pLight.position.set(5, 5, 10);
      scene.add(pLight);

      const aLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(aLight);

      let mouseX = 0, mouseY = 0;
      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / container.clientWidth - 0.5) * 2;
        mouseY = ((e.clientY - rect.top) / container.clientHeight - 0.5) * 2;
      });

      function animate() {
        requestAnimationFrame(animate);
        coreMesh.rotation.x += 0.008;
        coreMesh.rotation.y += 0.012;
        ringGroup.rotation.y += 0.004;

        ringGroup.rotation.x = THREE.MathUtils.lerp(ringGroup.rotation.x, mouseY * 0.4, 0.05);
        ringGroup.rotation.y = THREE.MathUtils.lerp(ringGroup.rotation.y, ringGroup.rotation.y + mouseX * 0.01, 0.05);

        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', () => {
        if (!container) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      });
    })();

    /* -------------------------------------------------------------
       11. Three.js: 3D Animation Thank You Universe
       ------------------------------------------------------------- */
    (function initThankYou3D() {
      const wrap = document.getElementById('thankyouCanvasWrap');
      if (!wrap || typeof THREE === 'undefined') return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, wrap.clientWidth / wrap.clientHeight, 0.1, 1000);
      camera.position.set(0, 0, 18);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(wrap.clientWidth, wrap.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      wrap.appendChild(renderer.domElement);

      const particleCount = 1200;
      const posArray = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 45;
      }
      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const particleMat = new THREE.PointsMaterial({
        size: 0.12,
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.8
      });
      const particleSystem = new THREE.Points(particleGeo, particleMat);
      scene.add(particleSystem);

      const knotGeo = new THREE.TorusKnotGeometry(4.2, 0.7, 100, 16);
      const knotMat = new THREE.MeshStandardMaterial({
        color: 0x14b8a6,
        wireframe: true,
        emissive: 0x0f766e,
        emissiveIntensity: 0.5
      });
      const knotMesh = new THREE.Mesh(knotGeo, knotMat);
      knotMesh.position.set(0, 0, -2);
      scene.add(knotMesh);

      const satGroup = new THREE.Group();
      scene.add(satGroup);
      for (let i = 0; i < 8; i++) {
        const satGeo = new THREE.IcosahedronGeometry(0.5, 1);
        const satMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24, wireframe: true });
        const sat = new THREE.Mesh(satGeo, satMat);
        const ang = (i / 8) * Math.PI * 2;
        sat.position.set(Math.cos(ang) * 9, Math.sin(ang) * 9, (Math.random() - 0.5) * 4);
        satGroup.add(sat);
      }

      const light1 = new THREE.PointLight(0x38bdf8, 2.5, 50);
      light1.position.set(10, 10, 10);
      scene.add(light1);

      const light2 = new THREE.PointLight(0xfbbf24, 2, 50);
      light2.position.set(-10, -10, 5);
      scene.add(light2);

      const ambient = new THREE.AmbientLight(0xffffff, 0.3);
      scene.add(ambient);

      let mouseX = 0, mouseY = 0;
      wrap.addEventListener('mousemove', (e) => {
        const rect = wrap.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / wrap.clientWidth - 0.5) * 2;
        mouseY = ((e.clientY - rect.top) / wrap.clientHeight - 0.5) * 2;
      });

      function animate() {
        requestAnimationFrame(animate);

        knotMesh.rotation.x += 0.005;
        knotMesh.rotation.y += 0.008;
        satGroup.rotation.z += 0.003;
        particleSystem.rotation.y += 0.001;

        camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX * 2.5, 0.05);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, -mouseY * 2.5, 0.05);
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', () => {
        if (!wrap) return;
        camera.aspect = wrap.clientWidth / wrap.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(wrap.clientWidth, wrap.clientHeight);
      });
    })();
