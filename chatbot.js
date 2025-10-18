// Career Guidance Chatbot Application

class CareerGuidanceChatbot {
    constructor() {
        this.currentStep = 'welcome';
        this.userResponses = {};
        this.riasecScores = {
            realistic: 0,
            investigative: 0,
            artistic: 0,
            social: 0,
            enterprising: 0,
            conventional: 0
        };
        this.currentQuestionIndex = 0;
        this.assessmentQuestions = this.getAssessmentQuestions();
        this.careerData = this.getCareerData();
        
        this.initializeElements();
        this.bindEvents();
        this.createParticles();
        this.startConversation();
    }

    initializeElements() {
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.quickReplies = document.getElementById('quickReplies');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.progressContainer = document.getElementById('progressContainer');
        this.progressFill = document.getElementById('progressFill');
        this.progressText = document.getElementById('progressText');
        this.careerCardsContainer = document.getElementById('careerCardsContainer');
        this.dashboardBtn = document.getElementById('dashboardBtn');
        this.moreCareersBtn = document.getElementById('moreCareersBtn');
        this.restartBtn = document.getElementById('restartBtn');
    }

    bindEvents() {
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        this.dashboardBtn.addEventListener('click', () => {
            this.addMessage('bot', '👋 Taking you back to the dashboard! Thanks for using our AI Career Guide.');
            setTimeout(() => {
                alert('Redirecting to dashboard... (This would navigate to your main dashboard in a real app)');
            }, 1000);
        });
        
        this.moreCareersBtn.addEventListener('click', () => {
            this.showMoreCareers();
        });
        
        this.restartBtn.addEventListener('click', () => {
            this.restartAssessment();
        });
    }

    getAssessmentQuestions() {
        return [
            {
                question: "I enjoy working with my hands and building things",
                type: "scale",
                category: "realistic"
            },
            {
                question: "I like solving complex puzzles and mathematical problems",
                type: "scale",
                category: "investigative"
            },
            {
                question: "I express myself through art, music, or creative writing",
                type: "scale",
                category: "artistic"
            },
            {
                question: "I find fulfillment in helping others with their problems",
                type: "scale",
                category: "social"
            },
            {
                question: "I enjoy leading teams and persuading others",
                type: "scale",
                category: "enterprising"
            },
            {
                question: "I prefer organized, structured work environments",
                type: "scale",
                category: "conventional"
            },
            {
                question: "I would rather work outdoors than in an office",
                type: "yes_no",
                category: "realistic"
            },
            {
                question: "I enjoy conducting research and analyzing data",
                type: "yes_no",
                category: "investigative"
            },
            {
                question: "I like to write stories, poems, or create visual art",
                type: "yes_no",
                category: "artistic"
            },
            {
                question: "I feel energized when teaching or mentoring others",
                type: "yes_no",
                category: "social"
            },
            {
                question: "I'm comfortable taking risks to achieve business goals",
                type: "yes_no",
                category: "enterprising"
            },
            {
                question: "I pay careful attention to details and accuracy",
                type: "yes_no",
                category: "conventional"
            },
            {
                question: "Which activity sounds most appealing?",
                type: "multiple_choice",
                options: [
                    { text: "Fixing a car engine", category: "realistic" },
                    { text: "Researching a scientific problem", category: "investigative" },
                    { text: "Designing a website", category: "artistic" },
                    { text: "Counseling someone through difficulties", category: "social" }
                ]
            },
            {
                question: "In group projects, I typically:",
                type: "multiple_choice",
                options: [
                    { text: "Focus on the technical implementation", category: "realistic" },
                    { text: "Research and analyze the problem", category: "investigative" },
                    { text: "Handle creative aspects and presentation", category: "artistic" },
                    { text: "Make sure everyone feels included and heard", category: "social" },
                    { text: "Take charge and coordinate the team", category: "enterprising" },
                    { text: "Organize tasks and keep track of deadlines", category: "conventional" }
                ]
            },
            {
                question: "My ideal work environment would be:",
                type: "multiple_choice",
                options: [
                    { text: "A workshop or outdoor setting", category: "realistic" },
                    { text: "A quiet research lab or library", category: "investigative" },
                    { text: "A creative studio or flexible workspace", category: "artistic" },
                    { text: "A collaborative office helping people", category: "social" },
                    { text: "A dynamic office environment with meetings", category: "enterprising" },
                    { text: "A structured office with clear procedures", category: "conventional" }
                ]
            }
        ];
    }

    getCareerData() {
        return {
            realistic: {
                name: "Realistic",
                description: "Hands-on, practical work with tools, machines, or outdoor activities",
                careers: [
                    {
                        title: "Civil Engineer",
                        description: "Design and build infrastructure like roads, bridges, and buildings",
                        salary: "$70,000 - $120,000",
                        growth: "High demand",
                        skills: ["Engineering", "Math", "Problem-solving", "CAD software"]
                    },
                    {
                        title: "Electrician",
                        description: "Install and maintain electrical systems in buildings and facilities",
                        salary: "$50,000 - $80,000",
                        growth: "Steady growth",
                        skills: ["Technical skills", "Safety protocols", "Troubleshooting"]
                    },
                    {
                        title: "Automotive Technician",
                        description: "Diagnose and repair vehicle mechanical and electrical problems",
                        salary: "$40,000 - $65,000",
                        growth: "Moderate growth",
                        skills: ["Mechanical aptitude", "Diagnostic tools", "Customer service"]
                    }
                ]
            },
            investigative: {
                name: "Investigative",
                description: "Research, analysis, and solving complex problems",
                careers: [
                    {
                        title: "Data Scientist",
                        description: "Analyze large datasets to extract insights and solve business problems",
                        salary: "$90,000 - $150,000",
                        growth: "Very high demand",
                        skills: ["Python/R", "Statistics", "Machine Learning", "SQL"]
                    },
                    {
                        title: "Software Developer",
                        description: "Design and build computer programs and applications",
                        salary: "$70,000 - $130,000",
                        growth: "Very high demand",
                        skills: ["Programming", "Problem-solving", "Algorithms", "Frameworks"]
                    },
                    {
                        title: "Cybersecurity Analyst",
                        description: "Protect organizations from digital threats and security breaches",
                        salary: "$80,000 - $140,000",
                        growth: "Extremely high demand",
                        skills: ["Network security", "Risk assessment", "Incident response"]
                    }
                ]
            },
            artistic: {
                name: "Artistic",
                description: "Creative expression through design, writing, or performance",
                careers: [
                    {
                        title: "UX Designer",
                        description: "Create user-friendly interfaces and improve digital experiences",
                        salary: "$65,000 - $110,000",
                        growth: "High demand",
                        skills: ["Design thinking", "Prototyping", "User research", "Figma/Adobe"]
                    },
                    {
                        title: "Content Creator",
                        description: "Produce engaging digital content for social media and marketing",
                        salary: "$40,000 - $80,000",
                        growth: "High demand",
                        skills: ["Creativity", "Video editing", "Social media", "Storytelling"]
                    },
                    {
                        title: "Graphic Designer",
                        description: "Create visual concepts for marketing, branding, and communication",
                        salary: "$45,000 - $75,000",
                        growth: "Moderate growth",
                        skills: ["Adobe Creative Suite", "Typography", "Branding", "Creativity"]
                    }
                ]
            },
            social: {
                name: "Social",
                description: "Helping, teaching, and caring for others",
                careers: [
                    {
                        title: "Registered Nurse",
                        description: "Provide medical care and support to patients in healthcare settings",
                        salary: "$65,000 - $95,000",
                        growth: "Very high demand",
                        skills: ["Medical knowledge", "Compassion", "Critical thinking", "Communication"]
                    },
                    {
                        title: "Teacher",
                        description: "Educate and inspire students in various subjects and grade levels",
                        salary: "$45,000 - $75,000",
                        growth: "Steady demand",
                        skills: ["Subject expertise", "Communication", "Patience", "Classroom management"]
                    },
                    {
                        title: "Social Worker",
                        description: "Help individuals and families overcome challenges and access resources",
                        salary: "$50,000 - $70,000",
                        growth: "Moderate growth",
                        skills: ["Empathy", "Case management", "Counseling", "Advocacy"]
                    }
                ]
            },
            enterprising: {
                name: "Enterprising",
                description: "Leading, persuading, and managing business activities",
                careers: [
                    {
                        title: "Product Manager",
                        description: "Guide product development from conception to launch and beyond",
                        salary: "$90,000 - $150,000",
                        growth: "Very high demand",
                        skills: ["Strategic thinking", "Leadership", "Analytics", "Communication"]
                    },
                    {
                        title: "Sales Manager",
                        description: "Lead sales teams and develop strategies to meet revenue goals",
                        salary: "$70,000 - $120,000",
                        growth: "Steady demand",
                        skills: ["Leadership", "Negotiation", "CRM software", "Strategy"]
                    },
                    {
                        title: "Marketing Manager",
                        description: "Develop and execute marketing campaigns to promote products/services",
                        salary: "$65,000 - $110,000",
                        growth: "High demand",
                        skills: ["Digital marketing", "Analytics", "Creativity", "Project management"]
                    }
                ]
            },
            conventional: {
                name: "Conventional",
                description: "Organizing, managing data, and following structured procedures",
                careers: [
                    {
                        title: "Financial Analyst",
                        description: "Analyze financial data to guide investment and business decisions",
                        salary: "$70,000 - $110,000",
                        growth: "High demand",
                        skills: ["Excel", "Financial modeling", "Analysis", "Attention to detail"]
                    },
                    {
                        title: "Accountant",
                        description: "Manage financial records and ensure compliance with regulations",
                        salary: "$55,000 - $85,000",
                        growth: "Steady demand",
                        skills: ["Accounting software", "Tax preparation", "Auditing", "Ethics"]
                    },
                    {
                        title: "Project Coordinator",
                        description: "Organize and track project activities to ensure timely completion",
                        salary: "$50,000 - $75,000",
                        growth: "Moderate growth",
                        skills: ["Organization", "Communication", "Project management tools", "Scheduling"]
                    }
                ]
            }
        };
    }

    createParticles() {
        const particles = document.getElementById('particles');
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.width = particle.style.height = Math.random() * 10 + 5 + 'px';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particles.appendChild(particle);
        }
    }

    startConversation() {
        setTimeout(() => {
            this.addMessage('bot', '🤖 Hello! I\'m your AI Career Guidance Assistant. I\'m here to help you discover career paths that match your interests and personality!');
            
            setTimeout(() => {
                this.addMessage('bot', '✨ I\'ll ask you some questions to understand your preferences using the RIASEC personality model. This will help me recommend careers perfect for you!');
                
                setTimeout(() => {
                    this.showQuickReplies([
                        { text: '🚀 Let\'s start the assessment!', action: 'start_assessment' },
                        { text: '📚 Tell me about RIASEC', action: 'explain_riasec' }
                    ]);
                }, 1500);
            }, 2000);
        }, 1000);
    }

    addMessage(sender, content, isHTML = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        if (isHTML) {
            contentDiv.innerHTML = content;
        } else {
            contentDiv.textContent = content;
        }
        
        messageDiv.appendChild(contentDiv);
        this.chatMessages.appendChild(messageDiv);
        
        this.scrollToBottom();
    }

    showTyping() {
        this.typingIndicator.style.display = 'flex';
        this.scrollToBottom();
    }

    hideTyping() {
        this.typingIndicator.style.display = 'none';
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }

    showQuickReplies(replies) {
        this.quickReplies.innerHTML = '';
        
        replies.forEach(reply => {
            const btn = document.createElement('button');
            btn.className = 'quick-reply-btn';
            btn.textContent = reply.text;
            btn.onclick = () => this.handleQuickReply(reply);
            this.quickReplies.appendChild(btn);
        });
    }

    handleQuickReply(reply) {
        this.addMessage('user', reply.text);
        this.clearQuickReplies();
        
        this.showTyping();
        
        setTimeout(() => {
            this.hideTyping();
            
            switch (reply.action) {
                case 'start_assessment':
                    this.startAssessment();
                    break;
                case 'explain_riasec':
                    this.explainRiasec();
                    break;
                default:
                    if (reply.value !== undefined) {
                        this.recordResponse(reply.value, reply.category);
                    }
                    break;
            }
        }, 1000);
    }

    clearQuickReplies() {
        this.quickReplies.innerHTML = '';
    }

    explainRiasec() {
        this.addMessage('bot', '📊 RIASEC is a career assessment model that categorizes people into 6 personality types:');
        
        setTimeout(() => {
            const explanation = `
                🔧 <strong>Realistic</strong>: Hands-on, practical work<br>
                🔬 <strong>Investigative</strong>: Research &amp; analysis<br>
                🎨 <strong>Artistic</strong>: Creative expression<br>
                🤝 <strong>Social</strong>: Helping others<br>
                💼 <strong>Enterprising</strong>: Leadership &amp; business<br>
                📋 <strong>Conventional</strong>: Organized, structured work
            `;
            this.addMessage('bot', explanation, true);
            
            setTimeout(() => {
                this.addMessage('bot', 'Ready to discover which types match your personality? 🌟');
                this.showQuickReplies([
                    { text: '✅ Yes, let\'s begin!', action: 'start_assessment' }
                ]);
            }, 1500);
        }, 1500);
    }

    startAssessment() {
        this.currentStep = 'assessment';
        this.progressContainer.style.display = 'block';
        
        this.addMessage('bot', '🎯 Perfect! I\'ll ask you 15 questions. Answer honestly for the best recommendations!');
        
        setTimeout(() => {
            this.askCurrentQuestion();
        }, 1000);
    }

    askCurrentQuestion() {
        if (this.currentQuestionIndex >= this.assessmentQuestions.length) {
            this.completeAssessment();
            return;
        }
        
        const question = this.assessmentQuestions[this.currentQuestionIndex];
        const progress = ((this.currentQuestionIndex) / this.assessmentQuestions.length) * 100;
        
        this.updateProgress(progress);
        
        this.addMessage('bot', `📝 Question ${this.currentQuestionIndex + 1}/${this.assessmentQuestions.length}: ${question.question}`);
        
        setTimeout(() => {
            this.showQuestionOptions(question);
        }, 500);
    }

    showQuestionOptions(question) {
        let options = [];
        
        switch (question.type) {
            case 'scale':
                options = [
                    { text: '💯 Strongly Agree', value: 5, category: question.category },
                    { text: '👍 Agree', value: 4, category: question.category },
                    { text: '🤷 Neutral', value: 3, category: question.category },
                    { text: '👎 Disagree', value: 2, category: question.category },
                    { text: '❌ Strongly Disagree', value: 1, category: question.category }
                ];
                break;
                
            case 'yes_no':
                options = [
                    { text: '✅ Yes', value: 5, category: question.category },
                    { text: '❌ No', value: 1, category: question.category }
                ];
                break;
                
            case 'multiple_choice':
                options = question.options.map(opt => ({
                    text: opt.text,
                    value: 5,
                    category: opt.category
                }));
                break;
        }
        
        this.showQuickReplies(options);
    }

    recordResponse(value, category) {
        this.riasecScores[category] += value;
        this.currentQuestionIndex++;
        
        const encouragements = [
            'Great choice! 🌟',
            'Excellent! 👏',
            'Perfect! ✨',
            'Nice! 👌',
            'Awesome! 🎉'
        ];
        
        this.addMessage('bot', encouragements[Math.floor(Math.random() * encouragements.length)]);
        
        setTimeout(() => {
            this.askCurrentQuestion();
        }, 800);
    }

    updateProgress(percentage) {
        this.progressFill.style.width = percentage + '%';
        this.progressText.textContent = `Assessment Progress: ${Math.round(percentage)}%`;
    }

    completeAssessment() {
        this.updateProgress(100);
        
        this.addMessage('bot', '🎊 Assessment complete! Let me analyze your responses...');
        
        this.showTyping();
        
        setTimeout(() => {
            this.hideTyping();
            this.generateRecommendations();
        }, 2000);
    }

    generateRecommendations() {
        // Find top 3 RIASEC categories
        const sortedCategories = Object.entries(this.riasecScores)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3);
        
        const topCategory = sortedCategories[0][0];
        const topScore = sortedCategories[0][1];
        
        this.addMessage('bot', `🎯 Based on your responses, you have strong ${this.careerData[topCategory].name} interests!`);
        
        setTimeout(() => {
            this.addMessage('bot', `💡 ${this.careerData[topCategory].description}`);
            
            setTimeout(() => {
                this.addMessage('bot', '🚀 Here are my top career recommendations for you:');
                
                setTimeout(() => {
                    this.showCareerRecommendations(sortedCategories);
                }, 1000);
            }, 1500);
        }, 1500);
    }

    showCareerRecommendations(sortedCategories) {
        this.careerCardsContainer.style.display = 'flex';
        this.careerCardsContainer.innerHTML = '';
        
        // Get top careers from top categories
        const recommendations = [];
        
        sortedCategories.forEach(([category, score], index) => {
            const careers = this.careerData[category].careers;
            const career = careers[0]; // Take first career from each category
            const matchPercentage = Math.min(95, Math.max(65, Math.round((score / 25) * 100)));
            
            recommendations.push({
                ...career,
                category: category,
                matchPercentage: matchPercentage
            });
        });
        
        recommendations.forEach((career, index) => {
            setTimeout(() => {
                this.createCareerCard(career);
            }, index * 500);
        });
        
        setTimeout(() => {
            this.showFinalOptions();
        }, recommendations.length * 500 + 1000);
    }

    createCareerCard(career) {
        const card = document.createElement('div');
        card.className = 'career-card';
        
        card.innerHTML = `
            <div class="career-match">${career.matchPercentage}% Match</div>
            <h3 class="career-title">${career.title}</h3>
            <p class="career-description">${career.description}</p>
            <div class="career-details">
                <span class="career-detail">💰 ${career.salary}</span>
                <span class="career-detail">📈 ${career.growth}</span>
            </div>
            <div class="career-details">
                ${career.skills.map(skill => `<span class="career-detail">${skill}</span>`).join('')}
            </div>
        `;
        
        card.addEventListener('click', () => {
            this.showCareerDetails(career);
        });
        
        this.careerCardsContainer.appendChild(card);
    }

    showCareerDetails(career) {
        this.addMessage('user', `Tell me more about ${career.title}`);
        
        this.showTyping();
        
        setTimeout(() => {
            this.hideTyping();
            
            const details = `
                🎯 <strong>${career.title}</strong><br><br>
                📝 <strong>Description:</strong> ${career.description}<br><br>
                💰 <strong>Salary Range:</strong> ${career.salary}<br>
                📈 <strong>Job Outlook:</strong> ${career.growth}<br><br>
                🛠️ <strong>Key Skills:</strong><br>
                ${career.skills.map(skill => `• ${skill}`).join('<br>')}
            `;
            
            this.addMessage('bot', details, true);
            
            setTimeout(() => {
                this.addMessage('bot', '💪 This career matches your interests and personality! Would you like to explore similar roles or learn about other opportunities?');
                
                this.showQuickReplies([
                    { text: '🔍 Show similar careers', action: 'show_similar' },
                    { text: '🌟 More recommendations', action: 'more_recommendations' },
                    { text: '📊 See my full results', action: 'show_results' }
                ]);
            }, 1500);
        }, 1000);
    }

    showFinalOptions() {
        this.addMessage('bot', '✨ These careers align perfectly with your personality! What would you like to do next?');
        
        this.showQuickReplies([
            { text: '🔍 Explore more careers', action: 'more_careers' },
            { text: '📊 See detailed results', action: 'show_results' },
            { text: '📚 Get learning resources', action: 'learning_resources' },
            { text: '🔄 Retake assessment', action: 'restart' }
        ]);
        
        this.restartBtn.style.display = 'flex';
    }

    showMoreCareers() {
        this.addMessage('bot', '🌟 Here are some trending careers in 2024 that might interest you:');
        
        const trendingCareers = [
            'Artificial Intelligence Engineer',
            'Data Scientist',
            'Cybersecurity Specialist',
            'Software Developer',
            'UX/UI Designer',
            'Digital Marketing Manager',
            'Product Manager',
            'Cloud Architect',
            'Registered Nurse',
            'Financial Analyst',
            'Renewable Energy Technician',
            'Mental Health Counselor'
        ];
        
        setTimeout(() => {
            const careerList = trendingCareers.map(career => `🚀 ${career}`).join('<br>');
            this.addMessage('bot', careerList, true);
            
            setTimeout(() => {
                this.addMessage('bot', '💡 Want me to analyze which of these best matches your assessment results?');
                
                this.showQuickReplies([
                    { text: '✅ Yes, analyze matches!', action: 'analyze_trending' },
                    { text: '🎯 Back to my recommendations', action: 'show_my_results' }
                ]);
            }, 1500);
        }, 1000);
    }

    restartAssessment() {
        // Reset all data
        this.currentStep = 'welcome';
        this.userResponses = {};
        this.riasecScores = {
            realistic: 0,
            investigative: 0,
            artistic: 0,
            social: 0,
            enterprising: 0,
            conventional: 0
        };
        this.currentQuestionIndex = 0;
        
        // Reset UI
        this.chatMessages.innerHTML = '';
        this.clearQuickReplies();
        this.progressContainer.style.display = 'none';
        this.careerCardsContainer.style.display = 'none';
        this.careerCardsContainer.innerHTML = '';
        this.restartBtn.style.display = 'none';
        
        // Restart conversation
        this.startConversation();
    }

    sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message) return;
        
        this.addMessage('user', message);
        this.messageInput.value = '';
        
        this.showTyping();
        
        setTimeout(() => {
            this.hideTyping();
            this.addMessage('bot', '🤔 I understand you want to chat, but I\'m specifically designed to help with career guidance through structured assessments. Let me know if you\'d like to restart the assessment or if you have questions about careers!');
            
            this.showQuickReplies([
                { text: '🔄 Restart assessment', action: 'restart' },
                { text: '💼 Tell me about careers', action: 'more_careers' }
            ]);
        }, 1000);
    }
}

// Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CareerGuidanceChatbot();
});