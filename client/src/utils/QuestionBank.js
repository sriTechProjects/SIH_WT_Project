export const randomizeOptions = (question) => {
    return {
        ...question,
        options: [...question.options].sort(() => Math.random() - 0.5),
    };
};

export const questions = {
    // problem solving [5questions]
    "Problem Solving": [
        {
            question: "Your team is assigned a high-priority project with ambiguous goals and limited time. Your first instinct is to:",
            options: [
                { text: "Categorize available information and identify the biggest bottlenecks.", score: 5, category: "problemSolving" },
                { text: "Explore unconventional methods that might lead to a breakthrough.", score: 4, category: "problemSolving" },
                { text: "Rely on previously successful methodologies to save time.", score: 3, category: "problemSolving" },
                { text: "Convene the team to gather diverse opinions and perspectives.", score: 2, category: "problemSolving" },
            ],
        },
        {
            question: "While debugging a critical issue in a system, your priority becomes:",
            options: [
                { text: "Evaluate logs systematically to pinpoint root causes.", score: 5, category: "problemSolving" },
                { text: "Experiment with unconventional fixes until something works.", score: 4, category: "problemSolving" },
                { text: "Follow an established debugging process step-by-step.", score: 3, category: "problemSolving" },
                { text: "Consult a peer who has faced a similar issue before.", score: 2, category: "problemSolving" },
            ],
        },
        {
            question: "In a challenging project, you feel most satisfied when:",
            options: [
                { text: "A systematic plan leads to project success.", score: 5, category: "problemSolving" },
                { text: "An unconventional idea sparks a breakthrough.", score: 4, category: "problemSolving" },
                { text: "Every team member contributes equally.", score: 3, category: "problemSolving" },
                { text: "You achieve results through collaboration.", score: 2, category: "problemSolving" },
            ],
        },
        {
            question: "When working under a strict deadline, you prefer to:",
            options: [
                { text: "Break tasks into manageable pieces.", score: 5, category: "problemSolving" },
                { text: "Think creatively about faster solutions.", score: 4, category: "problemSolving" },
                { text: "Stick to standard procedures.", score: 3, category: "problemSolving" },
                { text: "Seek immediate support from your team.", score: 2, category: "problemSolving" },
            ],
        },
        {
            question: "When solving problems, your default approach is to:",
            options: [
                { text: "Analyze data and make informed decisions.", score: 5, category: "problemSolving" },
                { text: "Brainstorm with the team for innovative ideas.", score: 4, category: "problemSolving" },
                { text: "Rely on tried-and-true methods.", score: 3, category: "problemSolving" },
                { text: "Seek external advice for guidance.", score: 2, category: "problemSolving" },
            ],
        },

        // Additional questions
        {
            question: "During a high-stakes client presentation, an unexpected technical error occurs. Your response is to:",
            options: [
                { text: "Quickly identify the root cause and address it immediately.", score: 5, category: "problemSolving" },
                { text: "Improvise a workaround and continue with minimal disruption.", score: 4, category: "problemSolving" },
                { text: "Pause the presentation and suggest rescheduling.", score: 3, category: "problemSolving" },
                { text: "Ask a colleague for assistance while you stall for time.", score: 2, category: "problemSolving" },
            ],
        },
        {
            question: "While planning a complex project, you encounter conflicting stakeholder priorities. You:",
            options: [
                { text: "Organize a meeting to clarify and resolve conflicts systematically.", score: 5, category: "problemSolving" },
                { text: "Prioritize the most critical tasks and address others later.", score: 4, category: "problemSolving" },
                { text: "Follow the stakeholder with the most authority.", score: 3, category: "problemSolving" },
                { text: "Focus on your tasks and let others decide the priorities.", score: 2, category: "problemSolving" },
            ],
        },
        {
            question: "You are assigned to lead a project in an unfamiliar domain. Your approach is to:",
            options: [
                { text: "Research extensively to build foundational knowledge.", score: 5, category: "problemSolving" },
                { text: "Collaborate with experts to gain insights as the project progresses.", score: 4, category: "problemSolving" },
                { text: "Use general management principles to structure the project.", score: 3, category: "problemSolving" },
                { text: "Delegate most responsibilities to team members familiar with the domain.", score: 2, category: "problemSolving" },
            ],
        },
        {
            question: "A resource your team heavily depends on suddenly becomes unavailable. You decide to:",
            options: [
                { text: "Identify and implement a suitable alternative immediately.", score: 5, category: "problemSolving" },
                { text: "Reallocate tasks to minimize the impact.", score: 4, category: "problemSolving" },
                { text: "Pause the project and wait for the resource to become available.", score: 3, category: "problemSolving" },
                { text: "Inform stakeholders about the delay and seek their advice.", score: 2, category: "problemSolving" },
            ],
        },
        {
            question: "Your team encounters an unforeseen regulatory hurdle that affects project timelines. Your next step is to:",
            options: [
                { text: "Evaluate the regulatory requirements and adjust the project accordingly.", score: 5, category: "problemSolving" },
                { text: "Seek expert advice to quickly find a compliant solution.", score: 4, category: "problemSolving" },
                { text: "Negotiate for an extension to accommodate the changes.", score: 3, category: "problemSolving" },
                { text: "Redirect focus to tasks unaffected by the regulations.", score: 2, category: "problemSolving" },
            ],
        },
    ],

    // Decision making [5 question]
    "Decision Making": [
        {
            question: "Faced with conflicting recommendations, you prefer to:",
            options: [
                { text: "Gather more information and analyze.", score: 5, category: "decisionMaking" },
                { text: "Trust your instincts.", score: 4, category: "decisionMaking" },
                { text: "Seek opinions to build consensus.", score: 3, category: "decisionMaking" },
                { text: "Pick the safest option to avoid failure.", score: 2, category: "decisionMaking" },
            ],
        },
        {
            question: "When evaluating past decisions, you focus on:",
            options: [
                { text: "Understanding what led to the outcome and its broader implications.", score: 5, category: "decisionMaking" },
                { text: "Assessing how your instinctive choices impacted results.", score: 4, category: "decisionMaking" },
                { text: "Analyzing team dynamics during decision-making.", score: 3, category: "decisionMaking" },
                { text: "Reviewing how smoothly the process was executed.", score: 2, category: "decisionMaking" },
            ],
        },
        {
            question: "Your preferred decision-making process involves:",
            options: [
                { text: "Logical analysis of all possible options.", score: 5, category: "decisionMaking" },
                { text: "Trusting intuition when information is incomplete.", score: 4, category: "decisionMaking" },
                { text: "Reaching consensus to ensure inclusivity.", score: 3, category: "decisionMaking" },
                { text: "Following a risk-averse approach to minimize disruptions.", score: 2, category: "decisionMaking" },
            ],
        },
        {
            question: "Under pressure to make a decision in a fast-changing environment, you:",
            options: [
                { text: "Rely on existing data and simulations for accuracy.", score: 5, category: "decisionMaking" },
                { text: "Make a quick choice based on gut feelings.", score: 4, category: "decisionMaking" },
                { text: "Seek input from peers to verify your decision.", score: 3, category: "decisionMaking" },
                { text: "Choose the least risky option to avoid setbacks.", score: 2, category: "decisionMaking" },
            ],
        },
        {
            question: "A sudden project opportunity arises but involves potential risks. You:",
            options: [
                { text: "Analyze benefits and drawbacks to decide.", score: 5, category: "decisionMaking" },
                { text: "Act quickly if the opportunity feels right.", score: 4, category: "decisionMaking" },
                { text: "Seek opinions from others to reduce uncertainty.", score: 3, category: "decisionMaking" },
                { text: "Wait to see how the situation develops.", score: 2, category: "decisionMaking" },
            ],
        },
        {
            question: "During a meeting, you are asked to make a decision with incomplete data. You:",
            options: [
                { text: "Assess the available data and make the best decision possible.", score: 5, category: "decisionMaking" },
                { text: "Rely on your intuition to guide you.", score: 4, category: "decisionMaking" },
                { text: "Postpone the decision until more data is available.", score: 3, category: "decisionMaking" },
                { text: "Ask the team to vote on the best option.", score: 2, category: "decisionMaking" },
            ],
        },
        {
            question: "You must allocate a limited budget to two equally critical projects. You decide to:",
            options: [
                { text: "Analyze the return on investment for both and allocate accordingly.", score: 5, category: "decisionMaking" },
                { text: "Divide the budget equally to minimize bias.", score: 4, category: "decisionMaking" },
                { text: "Choose the project with the most immediate needs.", score: 3, category: "decisionMaking" },
                { text: "Consult with stakeholders to get their input.", score: 2, category: "decisionMaking" },
            ],
        },
        {
            question: "While leading a team, you notice conflicting feedback about a strategy. You:",
            options: [
                { text: "Review the feedback, weigh the pros and cons, and decide independently.", score: 5, category: "decisionMaking" },
                { text: "Trust the feedback from the majority and proceed.", score: 4, category: "decisionMaking" },
                { text: "Engage in further discussions to achieve consensus.", score: 3, category: "decisionMaking" },
                { text: "Stick with the original plan to avoid delays.", score: 2, category: "decisionMaking" },
            ],
        },
        {
            question: "During a crisis, you are required to make a decision that could impact team morale. Your approach is to:",
            options: [
                { text: "Prioritize logical solutions, even if unpopular.", score: 5, category: "decisionMaking" },
                { text: "Balance team morale with practical outcomes.", score: 4, category: "decisionMaking" },
                { text: "Choose the option that aligns with majority opinions.", score: 3, category: "decisionMaking" },
                { text: "Defer the decision to avoid upsetting the team.", score: 2, category: "decisionMaking" },
            ],
        },
        {
            question: "You are presented with a long-term decision with potential risks and rewards. You:",
            options: [
                { text: "Evaluate all scenarios and make a calculated decision.", score: 5, category: "decisionMaking" },
                { text: "Trust your instincts and proceed confidently.", score: 4, category: "decisionMaking" },
                { text: "Seek advice to validate your choice before proceeding.", score: 3, category: "decisionMaking" },
                { text: "Choose the option with the least risk involved.", score: 2, category: "decisionMaking" },
            ],
        },
    ],


    // creative thinking [5questions]
    "Creative Thinking": [
        {
            question: "In a brainstorming session for a new solution, you:",
            options: [
                { text: "Suggest completely untested, bold ideas.", score: 5, category: "creativity" },
                { text: "Build on previous solutions and tweak them for better outcomes.", score: 4, category: "creativity" },
                { text: "Focus on ideas that can be implemented with minimal resources.", score: 3, category: "creativity" },
                { text: "Help organize the session but refrain from proposing ideas.", score: 2, category: "creativity" },
            ],
        },
        {
            question: "You feel most inspired when:",
            options: [
                { text: "Solving unique challenges that require out-of-the-box thinking.", score: 5, category: "creativity" },
                { text: "Drawing connections between unrelated ideas to form new ones.", score: 4, category: "creativity" },
                { text: "Seeing immediate, practical results from your efforts.", score: 3, category: "creativity" },
                { text: "Watching the team refine ideas into a cohesive solution.", score: 2, category: "creativity" },
            ],
        },
        {
            question: "When generating ideas, you focus on:",
            options: [
                { text: "Exploring unconventional approaches no one else has attempted.", score: 5, category: "creativity" },
                { text: "Blending successful past strategies into a fresh solution.", score: 4, category: "creativity" },
                { text: "Identifying approaches that ensure minimal disruption.", score: 3, category: "creativity" },
                { text: "Encouraging teammates to suggest their improvements.", score: 2, category: "creativity" },
            ],
        },
        {
            question: "When solving design problems, you often:",
            options: [
                { text: "Focus on untested approaches to innovate.", score: 5, category: "creativity" },
                { text: "Refine and improve existing designs.", score: 4, category: "creativity" },
                { text: "Simplify complex designs for easier implementation.", score: 3, category: "creativity" },
                { text: "Follow the latest industry standards closely.", score: 2, category: "creativity" },
            ],
        },
        {
            question: "When presented with a completely new challenge, you:",
            options: [
                { text: "Use it as an opportunity to innovate.", score: 5, category: "creativity" },
                { text: "Look for similar solutions in other industries.", score: 4, category: "creativity" },
                { text: "Focus on finding the quickest practical solution.", score: 3, category: "creativity" },
                { text: "Break it into small, manageable tasks first.", score: 2, category: "creativity" },
            ],
        },

        // Additional questions
        {
            question: "You are tasked with improving a long-standing process. Your approach is to:",
            options: [
                { text: "Propose radical changes to overhaul the process.", score: 5, category: "creativity" },
                { text: "Introduce incremental tweaks based on past feedback.", score: 4, category: "creativity" },
                { text: "Replicate methods that have worked elsewhere.", score: 3, category: "creativity" },
                { text: "Stick to the current process but improve documentation.", score: 2, category: "creativity" },
            ],
        },
        {
            question: "When collaborating on a project, you contribute by:",
            options: [
                { text: "Challenging conventional ideas to spark innovation.", score: 5, category: "creativity" },
                { text: "Building on others’ ideas to create something unique.", score: 4, category: "creativity" },
                { text: "Suggesting practical approaches that ensure feasibility.", score: 3, category: "creativity" },
                { text: "Helping organize and summarize the team’s thoughts.", score: 2, category: "creativity" },
            ],
        },
        {
            question: "Given a choice between two creative solutions, you prefer to:",
            options: [
                { text: "Choose the one that challenges traditional thinking.", score: 5, category: "creativity" },
                { text: "Pick the solution that balances novelty with practicality.", score: 4, category: "creativity" },
                { text: "Opt for the one that is easiest to implement.", score: 3, category: "creativity" },
                { text: "Defer to the team’s consensus.", score: 2, category: "creativity" },
            ],
        },
        {
            question: "While brainstorming, you tend to:",
            options: [
                { text: "Encourage bold, unconventional suggestions.", score: 5, category: "creativity" },
                { text: "Suggest ways to improve existing ideas.", score: 4, category: "creativity" },
                { text: "Focus on practical solutions that align with goals.", score: 3, category: "creativity" },
                { text: "Document ideas for future reference.", score: 2, category: "creativity" },
            ],
        },
        {
            question: "When faced with a creative block, you typically:",
            options: [
                { text: "Seek inspiration from unrelated fields.", score: 5, category: "creativity" },
                { text: "Revisit past ideas for potential improvements.", score: 4, category: "creativity" },
                { text: "Consult with peers for fresh perspectives.", score: 3, category: "creativity" },
                { text: "Pause and wait for ideas to come naturally.", score: 2, category: "creativity" },
            ],
        },
    ],


    // analytical epth [5questions]
    "Analytical Depth": [
        {
            question: "You’re tasked with solving a problem that seems to have multiple causes. Your first step is to:",
            options: [
                { text: "Isolate each variable and test their impact individually.", score: 5, category: "analyticalDepth" },
                { text: "Visualize the entire process to identify patterns or gaps.", score: 4, category: "analyticalDepth" },
                { text: "Create a checklist to systematically rule out less likely causes.", score: 3, category: "analyticalDepth" },
                { text: "Organize a team discussion to gather different perspectives.", score: 2, category: "analyticalDepth" },
            ],
        },
        {
            question: "When analyzing complex data, your first step is to:",
            options: [
                { text: "Break it into smaller, manageable pieces.", score: 5, category: "analyticalDepth" },
                { text: "Visualize trends to detect patterns.", score: 4, category: "analyticalDepth" },
                { text: "Follow standard processes to ensure accuracy.", score: 3, category: "analyticalDepth" },
                { text: "Consult team members for insights.", score: 2, category: "analyticalDepth" },
            ],
        },
        {
            question: "A colleague presents data that doesn’t fully align with expectations. You:",
            options: [
                { text: "Scrutinize the data for inconsistencies.", score: 5, category: "analyticalDepth" },
                { text: "Look for alternative explanations for the mismatch.", score: 4, category: "analyticalDepth" },
                { text: "Validate data using industry standards.", score: 3, category: "analyticalDepth" },
                { text: "Seek advice from other colleagues.", score: 2, category: "analyticalDepth" },
            ],
        },
        {
            question: "When solving a technical issue, you:",
            options: [
                { text: "Test each possible cause thoroughly.", score: 5, category: "analyticalDepth" },
                { text: "Look for patterns from past issues.", score: 4, category: "analyticalDepth" },
                { text: "Follow a structured troubleshooting process.", score: 3, category: "analyticalDepth" },
                { text: "Collaborate with peers for new insights.", score: 2, category: "analyticalDepth" },
            ],
        },
        {
            question: "In situations with incomplete data, you:",
            options: [
                { text: "Form hypotheses and test them rigorously.", score: 5, category: "analyticalDepth" },
                { text: "Find visual ways to explain gaps.", score: 4, category: "analyticalDepth" },
                { text: "Stick to proven methods to minimize errors.", score: 3, category: "analyticalDepth" },
                { text: "Rely on the team to fill in the gaps.", score: 2, category: "analyticalDepth" },
            ],
        },

        // Additional questions
        {
            question: "While reviewing an extensive report, your priority is to:",
            options: [
                { text: "Identify and analyze inconsistencies within the data.", score: 5, category: "analyticalDepth" },
                { text: "Look for patterns or trends to draw meaningful conclusions.", score: 4, category: "analyticalDepth" },
                { text: "Highlight actionable insights for immediate use.", score: 3, category: "analyticalDepth" },
                { text: "Consult colleagues to validate critical points.", score: 2, category: "analyticalDepth" },
            ],
        },
        {
            question: "You’re asked to evaluate a process that has several inefficiencies. You:",
            options: [
                { text: "Break it into smaller parts and analyze each component.", score: 5, category: "analyticalDepth" },
                { text: "Compare the current process to industry benchmarks.", score: 4, category: "analyticalDepth" },
                { text: "Focus on the parts causing the most obvious delays.", score: 3, category: "analyticalDepth" },
                { text: "Discuss with team members to get their insights.", score: 2, category: "analyticalDepth" },
            ],
        },
        {
            question: "When faced with conflicting reports, your approach is to:",
            options: [
                { text: "Verify the data sources to establish credibility.", score: 5, category: "analyticalDepth" },
                { text: "Compare the key figures to identify inconsistencies.", score: 4, category: "analyticalDepth" },
                { text: "Focus on the report that aligns with current trends.", score: 3, category: "analyticalDepth" },
                { text: "Defer the decision until the discrepancies are clarified by others.", score: 2, category: "analyticalDepth" },
            ],
        },
        {
            question: "You’re asked to summarize a large dataset for presentation. You:",
            options: [
                { text: "Use statistical tools to identify key insights.", score: 5, category: "analyticalDepth" },
                { text: "Create visualizations to simplify the data for the audience.", score: 4, category: "analyticalDepth" },
                { text: "Focus on highlighting the most practical aspects of the data.", score: 3, category: "analyticalDepth" },
                { text: "Gather feedback on what the audience wants to see.", score: 2, category: "analyticalDepth" },
            ],
        },
        {
            question: "When tasked with understanding a complex system, you:",
            options: [
                { text: "Map out its components and how they interact.", score: 5, category: "analyticalDepth" },
                { text: "Focus on identifying patterns within the system.", score: 4, category: "analyticalDepth" },
                { text: "Study the system's most visible aspects for quick insights.", score: 3, category: "analyticalDepth" },
                { text: "Collaborate with others to gain multiple perspectives.", score: 2, category: "analyticalDepth" },
            ],
        },
    ],


    // collaborative thinking [5questions]
    "Collaborative Thinking": [
        {
            question: "In a team project, you find that one member isn’t contributing effectively. You:",
            options: [
                { text: "Privately address the issue with them.", score: 5, category: "collaboration" },
                { text: "Encourage the team to support their contributions.", score: 4, category: "collaboration" },
                { text: "Take over their responsibilities yourself.", score: 3, category: "collaboration" },
                { text: "Leave it to the team leader to manage.", score: 2, category: "collaboration" },
            ],
        },
        {
            question: "When faced with disagreements within your team, you:",
            options: [
                { text: "Mediate and find a balanced middle ground.", score: 5, category: "collaboration" },
                { text: "Encourage open dialogue for better understanding.", score: 4, category: "collaboration" },
                { text: "Follow the majority opinion to avoid delays.", score: 3, category: "collaboration" },
                { text: "Let the disagreement resolve itself naturally.", score: 2, category: "collaboration" },
            ],
        },
        {
            question: "Your team is divided on the best course of action. You:",
            options: [
                { text: "Ensure every member’s perspective is considered.", score: 5, category: "collaboration" },
                { text: "Look for commonalities to bridge differences.", score: 4, category: "collaboration" },
                { text: "Side with the majority to move forward quickly.", score: 3, category: "collaboration" },
                { text: "Allow the leader to make the final decision.", score: 2, category: "collaboration" },
            ],
        },
        {
            question: "During a team brainstorming session, you:",
            options: [
                { text: "Actively encourage quieter members to share ideas.", score: 5, category: "collaboration" },
                { text: "Facilitate discussions to keep ideas flowing.", score: 4, category: "collaboration" },
                { text: "Focus on contributing your own ideas.", score: 3, category: "collaboration" },
                { text: "Let the session run its course naturally.", score: 2, category: "collaboration" },
            ],
        },
        {
            question: "You believe effective collaboration is best achieved by:",
            options: [
                { text: "Ensuring everyone feels equally valued.", score: 5, category: "collaboration" },
                { text: "Fostering open and transparent communication.", score: 4, category: "collaboration" },
                { text: "Assigning tasks based on strengths.", score: 3, category: "collaboration" },
                { text: "Allowing each person to work independently.", score: 2, category: "collaboration" },
            ],
        },
        // Additional questions
        {
            question: "When a team member proposes an idea you disagree with, you:",
            options: [
                { text: "Acknowledge their perspective and suggest a constructive alternative.", score: 5, category: "collaboration" },
                { text: "Discuss your concerns and propose modifications.", score: 4, category: "collaboration" },
                { text: "Respect their idea but focus on your own suggestions.", score: 3, category: "collaboration" },
                { text: "Ignore the idea and let others evaluate it.", score: 2, category: "collaboration" },
            ],
        },
        {
            question: "In a cross-functional team meeting, your role is to:",
            options: [
                { text: "Facilitate open communication among members.", score: 5, category: "collaboration" },
                { text: "Bridge gaps between differing perspectives.", score: 4, category: "collaboration" },
                { text: "Contribute your expertise and let others do the same.", score: 3, category: "collaboration" },
                { text: "Focus solely on tasks assigned to your domain.", score: 2, category: "collaboration" },
            ],
        },
        {
            question: "When a project deadline approaches, and tasks are incomplete, you:",
            options: [
                { text: "Encourage the team to prioritize critical tasks together.", score: 5, category: "collaboration" },
                { text: "Step in to assist team members struggling with their tasks.", score: 4, category: "collaboration" },
                { text: "Complete your own tasks efficiently to set an example.", score: 3, category: "collaboration" },
                { text: "Wait for the team leader to manage the workload.", score: 2, category: "collaboration" },
            ],
        },
        {
            question: "During a conflict over task ownership, your approach is to:",
            options: [
                { text: "Mediate a fair distribution of responsibilities.", score: 5, category: "collaboration" },
                { text: "Ensure tasks align with each member’s strengths.", score: 4, category: "collaboration" },
                { text: "Focus on your assigned tasks and let others resolve it.", score: 3, category: "collaboration" },
                { text: "Suggest the leader intervenes to resolve the conflict.", score: 2, category: "collaboration" },
            ],
        },
        {
            question: "When new members join your team, you prioritize:",
            options: [
                { text: "Ensuring they feel welcomed and included in discussions.", score: 5, category: "collaboration" },
                { text: "Explaining their roles clearly to help them integrate.", score: 4, category: "collaboration" },
                { text: "Observing their contributions before engaging with them.", score: 3, category: "collaboration" },
                { text: "Letting them adapt at their own pace.", score: 2, category: "collaboration" },
            ],
        },
    ],

}