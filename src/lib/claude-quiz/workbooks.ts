/**
 * Content of the four paid Claude workbooks, one per quiz level.
 * Strings may contain <b> tags (trusted, static copy written here).
 * Rendered by src/app/claude-quiz/workbook.
 */
export interface WorkbookLesson { h?: string; p?: string; list?: string[]; compare?: [string, string] }
export interface WorkbookExercise { q: string; hint?: string }
export interface WorkbookPart {
  h: string;
  intro?: string;
  lessons?: WorkbookLesson[];
  prompts?: [string, string][];
  ex?: WorkbookExercise[];
  days?: string[];
}
export interface Workbook {
  id: string;
  lvl: string;
  title: string;
  promise: string;
  time: string;
  parts: WorkbookPart[];
  next: [string, string];
}

export const WORKBOOKS: Workbook[] = [
  {
    "id": "starter",
    "lvl": "Level 1 · The Curious Observer",
    "title": "The Claude Starter Workbook",
    "promise": "From “I don't know what to ask” to using Claude with confidence for real things in your life. No jargon, no tech skills.",
    "time": "About 60 minutes, plus 7 short days",
    "parts": [
      {
        "h": "What Claude actually is",
        "intro": "Before you can use it well, you need a clear picture of what you're talking to. Most fear of AI comes from a fuzzy picture.",
        "lessons": [
          {
            "h": "Think of a brilliant new assistant on day one",
            "p": "Claude has read more than any person alive, writes fast and never gets tired. But it knows nothing about you, your life or your goals until you tell it. Every weak answer you've seen came from Claude guessing what you wanted."
          },
          {
            "h": "Two ways to use it",
            "list": [
              "<b>Chat</b>: you talk, Claude answers. Like messaging a very sharp friend. This is where you start.",
              "<b>Cowork</b>: you hand over a task and Claude does it, working with your files and tools. You'll get there later."
            ]
          },
          {
            "h": "What it's good at, and what it isn't",
            "list": [
              "Good at: thinking things through, writing and rewriting, explaining, planning, summarising, giving options.",
              "Not good at: knowing things about you it wasn't told, being right 100% of the time, replacing your judgement.",
              "Rule of thumb: Claude drafts, you decide."
            ]
          }
        ],
        "ex": [
          {
            "q": "What's one thing you've been avoiding, putting off, or overthinking lately?",
            "hint": "Work, money, family, a message you need to send. This is what you'll bring to Claude first."
          },
          {
            "q": "What's your honest fear or doubt about using AI?",
            "hint": "Naming it takes most of its power away."
          }
        ]
      },
      {
        "h": "The 3-part ask",
        "intro": "This one habit is the difference between generic answers and useful ones. Use it every time for the next 7 days.",
        "lessons": [
          {
            "h": "Who, what, how",
            "list": [
              "<b>Who</b>: who you are and your situation.",
              "<b>What</b>: what you want, as specifically as you can.",
              "<b>How</b>: the tone, length or format you'd like."
            ]
          },
          {
            "compare": [
              "Help me write an email to my landlord.",
              "I'm a tenant in London. My boiler has been broken for 9 days and I've reported it twice. Write a firm but polite email to my landlord asking for a repair date this week. Keep it under 150 words."
            ]
          },
          {
            "h": "When the answer isn't right",
            "p": "Don't start again. Reply and tell it what to change: “Shorter.” “Warmer.” “Less formal, I'm talking to my sister.” “That's not quite it, what I mean is…”. Claude gets better the more you steer it in the same conversation."
          }
        ],
        "ex": [
          {
            "q": "Rewrite this weak ask using who, what, how: “Give me a workout plan.”",
            "hint": "Add who you are, what you want from it, and how you want it laid out."
          },
          {
            "q": "Now write a 3-part ask for the thing you named in Part 1.",
            "hint": "You'll paste this into Claude on Day 1."
          }
        ]
      },
      {
        "h": "20 prompts to start with",
        "intro": "Copy, fill in the brackets, paste into Claude. Pick the ones that match your life right now.",
        "prompts": [
          [
            "Untangle a decision",
            "I'm deciding between [option A] and [option B]. Here's my situation: [details]. Ask me 3 questions first, then lay out the pros, cons and what you'd choose."
          ],
          [
            "Plan my week",
            "Here's everything on my plate this week: [list]. Put it in order of what matters most and tell me what I can drop or delegate."
          ],
          [
            "Say it better",
            "Here's a message I need to send: [paste]. Make it clearer and kinder without losing the point."
          ],
          [
            "Hard conversation",
            "I need to talk to [person] about [issue]. Help me plan what to say, what they might say back, and how to stay calm."
          ],
          [
            "Explain it simply",
            "Explain [topic] to me like I'm smart but new to it. Use one everyday example."
          ],
          [
            "Money check",
            "My monthly income is roughly [amount] and my main costs are [list]. Help me see where money leaks and give me 3 simple changes."
          ],
          [
            "Career next step",
            "I work as [role] and I want [goal] in the next year. What are 3 realistic paths and the first step for each?"
          ],
          [
            "CV glow-up",
            "Here's my CV: [paste]. I'm applying for [role]. Rewrite my top 3 bullet points to show results."
          ],
          [
            "Learn anything",
            "I want to learn [skill] in 30 days with 20 minutes a day. Make me a simple day-by-day plan."
          ],
          [
            "Meal plan",
            "Plan 5 simple dinners for [number] people. We like [foods], avoid [foods], and budget is [amount]."
          ],
          [
            "Reply to a tricky email",
            "Here's an email I received: [paste]. Draft 2 replies: one firm, one friendly."
          ],
          [
            "Summarise this",
            "Summarise this in 5 bullet points and tell me what I should do next: [paste text]."
          ],
          [
            "Brainstorm",
            "Give me 15 ideas for [thing]. Mix safe ones with bold ones and mark your top 3."
          ],
          [
            "Social post",
            "Turn this thought into a short LinkedIn post in my voice (plain, warm, no hype): [your thought]."
          ],
          [
            "Feedback on my idea",
            "Here's my idea: [idea]. Be honest. What's weak about it and what would make it stronger?"
          ],
          [
            "Prepare for a meeting",
            "I have a meeting with [who] about [what]. What should I ask, what might come up, and what's my goal?"
          ],
          [
            "Goal breakdown",
            "My goal is [goal] by [date]. Break it into monthly milestones and this week's first 3 actions."
          ],
          [
            "Calm my mind",
            "I'm overwhelmed by [situation]. Help me separate what I can control from what I can't, and pick one small next step."
          ],
          [
            "Gift or event idea",
            "Help me plan [event/gift] for [person] who loves [interests]. Budget: [amount]."
          ],
          [
            "Teach me to ask better",
            "Here's a question I want to ask you: [question]. Before answering, tell me what extra context would make your answer much better."
          ]
        ]
      },
      {
        "h": "Your first 7 days",
        "intro": "Ten minutes a day. Tick each one off as you go.",
        "days": [
          "Paste your 3-part ask from Part 2 into Claude. Reply at least twice to steer it.",
          "Use the “Plan my week” prompt with your real to-do list.",
          "Take a message you need to send and use “Say it better”.",
          "Ask Claude to explain something you've always been confused about.",
          "Use “Untangle a decision” on something real, big or small.",
          "Pick any prompt from Part 3 you haven't tried yet.",
          "Ask Claude: “Based on our chats, what else could you help me with?”"
        ]
      },
      {
        "h": "Reflect",
        "intro": "Write this down. It's how the habit sticks.",
        "ex": [
          {
            "q": "What was your best result from Claude this week?"
          },
          {
            "q": "Where did it let you down, and what would you say differently next time?"
          },
          {
            "q": "What's one thing you'll now use Claude for every week?"
          }
        ]
      }
    ],
    "next": [
      "Ready for Level 2?",
      "When the 3-part ask feels natural and you're using Claude a few times a week, you're ready to go deeper. Retake the quiz to check."
    ]
  },
  {
    "id": "conversation",
    "lvl": "Level 2 · The Casual Asker",
    "title": "The Claude Conversation Workbook",
    "promise": "Stop using Claude like a search engine. Learn the context, refining and file habits that turn quick answers into real results.",
    "time": "About 90 minutes, plus 7 short days",
    "parts": [
      {
        "h": "Why your answers feel generic",
        "intro": "Claude matches the effort and detail you give it. Short question in, average answer out.",
        "lessons": [
          {
            "h": "The context gap",
            "p": "When you ask a one-liner, Claude has to guess who you are, why you're asking and what good looks like. It guesses the most average version. Your job is to close the gap."
          },
          {
            "h": "The context formula",
            "list": [
              "<b>Role</b>: who you are and your situation.",
              "<b>Goal</b>: what this is for and what a great result looks like.",
              "<b>Material</b>: paste or attach what Claude needs to see.",
              "<b>Limits</b>: length, tone, what to avoid.",
              "<b>Ask back</b>: “If anything is unclear, ask me before you start.”"
            ]
          },
          {
            "compare": [
              "Write a bio for my website.",
              "I'm a Lagos-based career coach for mid-level professionals moving into tech. This bio goes on my website's About page. Here are my notes: [paste]. Keep it under 120 words, first person, warm but credible. No buzzwords. Ask me anything you need first."
            ]
          }
        ],
        "ex": [
          {
            "q": "Pick a question you asked Claude recently. Rewrite it using all five parts of the context formula."
          }
        ]
      },
      {
        "h": "Shape the answer, don't restart",
        "intro": "The best results come from the third or fourth reply, not the first.",
        "lessons": [
          {
            "h": "Steering moves",
            "list": [
              "<b>Narrow it</b>: “Focus only on point 2 and go deeper.”",
              "<b>Change the voice</b>: “Make it sound like me. Here's something I wrote: [paste].”",
              "<b>Challenge it</b>: “What's the weakest part of this? Fix it.”",
              "<b>Get options</b>: “Give me 3 very different versions.”",
              "<b>Check it</b>: “What are you unsure about in this answer?”"
            ]
          },
          {
            "h": "Ask Claude to interview you",
            "p": "For anything personal or important, flip it: “Ask me one question at a time until you understand my situation, then give me your advice.” This is one of the most powerful habits you can build."
          }
        ],
        "ex": [
          {
            "q": "Take one answer Claude gave you and write three steering replies you could send to improve it."
          },
          {
            "q": "What's a topic where you want Claude to interview you first?",
            "hint": "A career move, a business idea, a relationship question."
          }
        ]
      },
      {
        "h": "Bring your own material",
        "intro": "Claude can read your documents. This is where it stops being generic and starts being about you.",
        "lessons": [
          {
            "h": "What you can give it",
            "list": [
              "PDFs: contracts, reports, bank letters, course notes.",
              "Documents: your CV, proposals, drafts.",
              "Spreadsheets: budgets, sales, lists.",
              "Screenshots: a confusing form, an error, a chat you want help replying to."
            ]
          },
          {
            "h": "Good things to ask about a file",
            "list": [
              "“Summarise this and tell me what I need to act on.”",
              "“What in this contract should I push back on?” (then check with a professional)",
              "“Find the patterns in this spreadsheet.”",
              "“Compare these two documents. What changed?”"
            ]
          },
          {
            "h": "A word on privacy",
            "p": "Don't upload anything you wouldn't be comfortable sharing with a trusted adviser. Remove account numbers, ID numbers and passwords first."
          }
        ],
        "ex": [
          {
            "q": "List three documents in your life right now that Claude could help you with."
          }
        ]
      },
      {
        "h": "Set it up once: Projects and instructions",
        "intro": "Stop re-explaining yourself every time.",
        "lessons": [
          {
            "h": "Projects",
            "p": "A Project is a folder in Claude with its own files and instructions. Make one for each area of your life or work: “My business”, “Job search”, “Family admin”. Everything you chat about inside it already knows the background."
          },
          {
            "h": "Instructions",
            "p": "In each Project, write a short “about me” once: who you are, what you're working on, how you like answers. Claude reads it before every chat."
          }
        ],
        "ex": [
          {
            "q": "Write your Project instructions for one area of your life.",
            "hint": "Who you are · what you're working on · how you like answers (tone, length, format) · what to never do."
          }
        ]
      },
      {
        "h": "Your first step into Cowork",
        "intro": "Chat is talking. Cowork is handing over a task and getting finished work back.",
        "lessons": [
          {
            "h": "When to use Cowork instead of Chat",
            "list": [
              "The task has several steps.",
              "It involves files you want created or changed.",
              "You want to walk away and come back to a finished thing."
            ]
          },
          {
            "h": "Your first handoff",
            "p": "Start small and safe. For example: “Here are my notes from this week. Turn them into a tidy one-page summary document with action points.”"
          }
        ],
        "prompts": [
          [
            "First Cowork task",
            "I've attached [files]. Please [task] and give me the finished [document/list/file]. Before you start, tell me your plan in 3 steps."
          ]
        ]
      },
      {
        "h": "Your 7-day practice",
        "intro": "Ten to fifteen minutes a day.",
        "days": [
          "Rewrite one real request with the full context formula.",
          "Use three steering replies on one answer.",
          "Ask Claude to interview you about a real decision.",
          "Upload one document and ask what you need to act on.",
          "Create your first Project and write its instructions.",
          "Have a chat inside your Project and notice the difference.",
          "Try your first Cowork task using the prompt above."
        ]
      },
      {
        "h": "Reflect",
        "ex": [
          {
            "q": "Which habit made the biggest difference this week?"
          },
          {
            "q": "What will you put into a Project next?"
          }
        ]
      }
    ],
    "next": [
      "Ready for Level 3?",
      "When you're refining answers without thinking and using your own files, the next jump is handing whole tasks to Claude. Retake the quiz to check."
    ]
  },
  {
    "id": "cowork",
    "lvl": "Level 3 · The Thinking Partner",
    "title": "The Cowork Handoff Workbook",
    "promise": "You already think with Claude. Now let it do the work: Cowork, connected tools and repeatable workflows that give you hours back.",
    "time": "About 2 hours, plus 7 short days",
    "parts": [
      {
        "h": "From thinking to doing",
        "intro": "The shift from Level 3 to Level 4 is a mindset shift. You stop asking “how would I do this?” and start asking “can Claude do this for me?”",
        "lessons": [
          {
            "h": "Chat vs Cowork",
            "list": [
              "<b>Chat</b>: best for thinking, deciding, drafting and learning.",
              "<b>Cowork</b>: best for doing. It works through steps, creates and edits files, uses your connected tools, and keeps going while you do something else."
            ]
          },
          {
            "h": "What a good handoff looks like",
            "list": [
              "<b>Outcome</b>: what “done” looks like.",
              "<b>Inputs</b>: the files, links or tools it needs.",
              "<b>Rules</b>: what to never do, what to check with you first.",
              "<b>Check-in</b>: “Show me your plan before you start.”"
            ]
          },
          {
            "compare": [
              "Sort out my files.",
              "In my Downloads folder there are about 60 invoices and receipts from 2026. Rename each one as YYYY-MM-supplier-amount, move them into monthly folders, and give me a spreadsheet listing them all. Don't delete anything. Show me your plan first."
            ]
          }
        ],
        "ex": [
          {
            "q": "List 5 tasks you do every week or month that take more than 20 minutes.",
            "hint": "These are your handoff candidates."
          },
          {
            "q": "Pick one. Write the full handoff: outcome, inputs, rules, check-in."
          }
        ]
      },
      {
        "h": "Your first 5 handoffs",
        "intro": "Ready-made tasks. Adapt the brackets and run them in Cowork.",
        "prompts": [
          [
            "Inbox triage",
            "Go through my emails from the last 3 days. Group them into: needs me today, can wait, and no action. Draft replies for anything simple and leave them as drafts for me to review."
          ],
          [
            "Weekly plan",
            "Look at my calendar for next week and my notes in [file]. Build me a one-page weekly plan with my 3 priorities and where I'll do deep work."
          ],
          [
            "Document from notes",
            "Take my rough notes in [file] and turn them into a polished [proposal/report/brief] in a Word document. Keep my voice."
          ],
          [
            "Research brief",
            "Research [topic] and give me a 2-page brief with key facts, sources, and what it means for [my goal]."
          ],
          [
            "Folder clean-up",
            "Organise the files in [folder] into clear sub-folders with consistent names. Don't delete anything. Give me a list of what moved."
          ]
        ]
      },
      {
        "h": "Connect your tools safely",
        "intro": "Connected tools are what make Cowork feel like a real assistant.",
        "lessons": [
          {
            "h": "Start with these three",
            "list": [
              "<b>Email</b>: triage, drafting replies, finding things.",
              "<b>Calendar</b>: planning, prep for meetings, spotting overload.",
              "<b>Drive or files</b>: reading, organising and creating documents."
            ]
          },
          {
            "h": "Stay in control",
            "list": [
              "Ask for drafts, not sends, until you trust the result.",
              "Tell it what it must never do (delete, pay, send without asking).",
              "Review the first few runs closely, then relax."
            ]
          }
        ],
        "ex": [
          {
            "q": "Which tools would save you the most time if Claude could use them?"
          },
          {
            "q": "Write your “never do” rules for Claude.",
            "hint": "e.g. never send emails without my OK, never delete files, never share documents."
          }
        ]
      },
      {
        "h": "Turn a task into a workflow",
        "intro": "If you've explained it twice, it should be a workflow.",
        "lessons": [
          {
            "h": "The workflow recipe",
            "list": [
              "Do the task once with Claude, step by step.",
              "Ask: “Write this up as a reusable set of instructions I can give you next time.”",
              "Save those instructions in a Project, or as a skill if you use them often.",
              "Next time, one line: “Run my weekly report.”"
            ]
          },
          {
            "h": "Scheduled tasks",
            "p": "Some tasks can run on a schedule, like a Monday morning summary of your week. Start with one and review it for a few weeks before adding more."
          }
        ],
        "prompts": [
          [
            "Make it reusable",
            "We just did [task] together. Write clear, reusable instructions so I can ask you to do this again with one sentence. Include what inputs you'll need each time."
          ]
        ]
      },
      {
        "h": "Review without redoing",
        "intro": "Handing off only saves time if checking is quick.",
        "lessons": [
          {
            "h": "Quick checks",
            "list": [
              "Ask Claude to list anything it was unsure about.",
              "Spot-check 2 or 3 items, not everything.",
              "Tell it what was wrong so the next run is better.",
              "If you're rewriting most of it, your handoff needs clearer rules."
            ]
          }
        ]
      },
      {
        "h": "Your 7-day handoff sprint",
        "intro": "One real handoff a day.",
        "days": [
          "Run your own handoff from Part 1.",
          "Run the inbox triage prompt.",
          "Connect one tool and run a task with it.",
          "Turn one finished task into reusable instructions.",
          "Hand off a document task from rough notes.",
          "Run yesterday's workflow again with one line.",
          "Count the time you saved this week and write it below."
        ]
      },
      {
        "h": "Reflect",
        "ex": [
          {
            "q": "How many hours did you get back this week?"
          },
          {
            "q": "Which workflow will you keep running every week?"
          }
        ]
      }
    ],
    "next": [
      "Ready for Level 4?",
      "When Claude is doing real work for you every week, the next step is building systems and turning this skill into leverage and income. Retake the quiz to check."
    ]
  },
  {
    "id": "operator",
    "lvl": "Level 4 · The Operator",
    "title": "The Claude Operator Workbook",
    "promise": "You're in the top tier. This workbook helps you build systems that run without you and turn your Claude fluency into time back and income.",
    "time": "About 2 to 3 hours, plus 7 short days",
    "parts": [
      {
        "h": "Audit your AI operating system",
        "intro": "Before you build more, see what you have.",
        "lessons": [
          {
            "h": "Four layers",
            "list": [
              "<b>Knowledge</b>: Projects, instructions and files Claude knows about you.",
              "<b>Tools</b>: what Claude is connected to.",
              "<b>Workflows</b>: tasks Claude runs from one line.",
              "<b>Schedule</b>: what runs without you asking."
            ]
          }
        ],
        "ex": [
          {
            "q": "List what you have in each layer today."
          },
          {
            "q": "Where are you still the bottleneck?",
            "hint": "Tasks that wait for you to start them, check them, or pass them on."
          }
        ]
      },
      {
        "h": "Design systems that run without you",
        "intro": "A system is a workflow plus a trigger plus a review point.",
        "lessons": [
          {
            "h": "The system recipe",
            "list": [
              "<b>Trigger</b>: a schedule or an event (new email, new file, Monday 8am).",
              "<b>Steps</b>: the workflow Claude runs.",
              "<b>Output</b>: where the result lands.",
              "<b>Review</b>: when and how you check it."
            ]
          },
          {
            "h": "Good first systems",
            "list": [
              "Monday briefing: your week, priorities and anything overdue.",
              "Content engine: turn one idea into posts for each platform.",
              "Client follow-up: draft check-ins for anyone you haven't heard from in 2 weeks.",
              "Money check: monthly summary of income, spending and invoices due."
            ]
          }
        ],
        "ex": [
          {
            "q": "Design one system: trigger, steps, output, review."
          }
        ],
        "prompts": [
          [
            "Build a system",
            "I want a system that [goal]. It should run [when]. Design the steps, tell me what access you need, and set it up to leave results in [place] for me to review."
          ]
        ]
      },
      {
        "h": "Skills: package your know-how",
        "intro": "A skill is your way of doing something, written down so Claude can do it the same way every time.",
        "lessons": [
          {
            "h": "What makes a good skill",
            "list": [
              "A task you do often with a clear standard.",
              "Your rules, examples and checklist included.",
              "A clear “done” so Claude knows when to stop."
            ]
          }
        ],
        "ex": [
          {
            "q": "Which 3 things do you do better than most people?",
            "hint": "These are the skills worth capturing first."
          }
        ],
        "prompts": [
          [
            "Capture a skill",
            "Interview me about how I do [task]. Ask one question at a time. Then write it up as step-by-step instructions, with my rules and a quality checklist, so you can do it my way every time."
          ]
        ]
      },
      {
        "h": "Turn fluency into income",
        "intro": "Most people are still at Level 1 or 2. What feels ordinary to you is valuable to them.",
        "lessons": [
          {
            "h": "Four ways to earn from it",
            "list": [
              "<b>Do it for others</b>: set up Claude systems for small businesses.",
              "<b>Teach it</b>: workshops, courses or coaching in your niche.",
              "<b>Productise it</b>: templates, workbooks or prompt packs for a specific audience.",
              "<b>Use it to scale</b>: take on more clients in your existing work without more hours."
            ]
          }
        ],
        "ex": [
          {
            "q": "Who in your world is stuck at Level 1 or 2 and would pay to get ahead?"
          },
          {
            "q": "Which of the four routes fits you best, and what's the first small offer you could test?"
          }
        ],
        "prompts": [
          [
            "Offer builder",
            "I'm good at [skills] and I use Claude to [what you do]. My audience is [who]. Suggest 3 small offers I could test in 30 days, with a price, what's included and how I'd find the first 5 buyers."
          ]
        ]
      },
      {
        "h": "Lead others across the bridge",
        "intro": "Teaching others is the fastest way to deepen your own skill.",
        "lessons": [
          {
            "h": "Start where people are",
            "list": [
              "Share one real before-and-after from your week.",
              "Give people one prompt, not twenty.",
              "Talk about fear and permission, not just features."
            ]
          }
        ],
        "ex": [
          {
            "q": "Who is one person you'll help take their first real step with Claude this week?"
          }
        ]
      },
      {
        "h": "Your 7-day operator sprint",
        "days": [
          "Complete the four-layer audit.",
          "Design your first system on paper.",
          "Build it with Claude and run it once.",
          "Capture one skill with the interview prompt.",
          "Run the offer builder prompt and pick one offer.",
          "Share one before-and-after publicly or with a friend.",
          "Review: what runs without you now that didn't a week ago?"
        ]
      },
      {
        "h": "Reflect",
        "ex": [
          {
            "q": "What now runs without you?"
          },
          {
            "q": "What's the one offer or system you'll finish in the next 30 days?"
          }
        ]
      }
    ],
    "next": [
      "What's next",
      "You've got the systems. If you want help designing an AI-powered income stream around your expertise, look out for the next Business Architect cohort."
    ]
  }
];
