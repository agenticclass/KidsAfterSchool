const lessons = {
    html: [
        {
            title: "Mission 1: Create Your First Webpage! 🚀",
            content: `
                <div class="mission-card">
                    <div class="mission-header">
                        <span class="mission-badge">Beginner</span>
                        <h3>HTML Basics</h3>
                    </div>
                    <p>Let's create your first heading! Type this magical code:</p>
                    <div class="code-example">
                        &lt;h1&gt;Hello Space Explorer!&lt;/h1&gt;
                    </div>
                    <div class="mission-tips">
                        <h4>🌟 Space Tips:</h4>
                        <ul>
                            <li>h1 is the biggest heading</li>
                            <li>Don't forget the closing tag!</li>
                        </ul>
                    </div>
                </div>
            `,
            template: "<h1>Hello Space Explorer!</h1>",
            type: "html"
        },
        {
            title: "Mission 2: Colors of the Galaxy! 🌈",
            content: `
                <div class="mission-card">
                    <div class="mission-header">
                        <span class="mission-badge">Explorer</span>
                        <h3>Adding Colors</h3>
                    </div>
                    <p>Create a colorful paragraph:</p>
                    <div class="code-example">
                        &lt;p style="color: purple"&gt;My space adventure!&lt;/p&gt;
                    </div>
                    <div class="mission-tips">
                        <h4>🎨 Color Tips:</h4>
                        <ul>
                            <li>Try different colors: red, blue, green</li>
                            <li>Colors make websites fun!</li>
                        </ul>
                    </div>
                </div>
            `,
            template: '<p style="color: purple">My space adventure!</p>',
            type: "html"
        }
    ],
    python: [
        {
            title: "Mission 1: Your First Python Message! 🐍",
            content: `
                <div class="mission-card">
                    <div class="mission-header">
                        <span class="mission-badge">Beginner</span>
                        <h3>Python Print</h3>
                    </div>
                    <p>Send your first message to space:</p>
                    <div class="code-example">
                        print('Hello, Space Explorer! 🚀')
                    </div>
                    <div class="mission-tips">
                        <h4>🌟 Coding Tips:</h4>
                        <ul>
                            <li>Don't forget the quotes!</li>
                            <li>Check your spelling</li>
                        </ul>
                    </div>
                </div>
            `,
            template: "print('Hello, Space Explorer! 🚀')",
            type: "python"
        }
    ]
};

let currentLanguage = 'html';
let currentLesson = 0;
let progress = 0;

// Animation for rocket
const animateRocket = () => {
    gsap.to(".rocket", {
        rotation: 360,
        duration: 2,
        ease: "power1.inOut"
    });
};

function switchLanguage(language) {
    currentLanguage = language;
    currentLesson = 0;
    updateLesson();
    
    // Animate progress bar reset
    gsap.to(".progress", {
        width: "0%",
        duration: 0.5
    });
    
    // Animate button click
    gsap.to(`.${language}-btn`, {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1
    });
}

function updateLesson() {
    const lesson = lessons[currentLanguage][currentLesson];
    
    // Animate content change
    gsap.to("#lesson-content", {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            document.getElementById('lesson-title').innerHTML = lesson.title;
            document.getElementById('lesson-content').innerHTML = lesson.content;
            gsap.to("#lesson-content", {
                opacity: 1,
                duration: 0.3
            });
        }
    });
    
    document.getElementById('code-editor').value = '';
    document.getElementById('code-output').innerHTML = '';
}

function runCode() {
    const code = document.getElementById('code-editor').value;
    const output = document.getElementById('code-output');
    
    // Animate run button
    gsap.to("#run-code", {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    
    if (currentLanguage === 'html') {
        // Animate output appearance
        gsap.to(output, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
                output.innerHTML = code;
                gsap.to(output, {
                    opacity: 1,
                    duration: 0.2
                });
            }
        });
    } else if (currentLanguage === 'python') {
        output.innerHTML = "🚀 Python output coming soon...";
    }
    
    // Update progress
    progress += 20;
    if (progress > 100) progress = 100;
    
    gsap.to(".progress", {
        width: `${progress}%`,
        duration: 0.5
    });
}

// Initialize
updateLesson();

// Add some fun animations
gsap.to(".floating-panel", {
    y: 20,
    duration: 2,
    yoyo: true,
    repeat: -1,
    ease: "power1.inOut",
    stagger: 0.2
}); 