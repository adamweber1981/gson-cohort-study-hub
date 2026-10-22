"use strict";
/* Preserved from original homepage; keep course and exam paths exact. */
const STUDY_HUB = [
      // COURSE 1: Pathophysiology
      {
        course: "Pathophysiology",
        icon: "🧬",
        description: "Disease processes, mechanisms & clinical application",
        exams: [
          // Exam 2: each entry below becomes one clickable practice-exam card.
          {
            name: "Exam 2",
            versions: [
              {
                version: "2A",
                file: "Pathophysiology/Exam 2/Pathophysiology Exam 2a.html",
                description: "Practice version A with immediate study feedback."
              },
              {
                version: "2B",
                file: "Pathophysiology/Exam 2/Pathophysiology Exam 2b.html",
                description: "Practice version B for additional review and repetition."
              },
              {
                version: "2C",
                file: "Pathophysiology/Exam 2/Pathophysiology Exam 2c.html",
                description: "Practice version C with another mix of questions."
              },
              {
                version: "2D",
                file: "Pathophysiology/Exam 2/Pathophysiology Exam 2d.html",
                description: "Practice version D."
              }
            ]
          }
        ]
      },

      // COURSE 2: Pharmacology
      {
        course: "Pharmacology",
        icon: "💊",
        description: "Medication classes, safety, adverse effects & nursing considerations",
        exams: [
          // Exam 2: each entry below becomes one clickable practice-exam card.
          {
            name: "Exam 2",
            versions: [
              {
                version: "Immunomodulators - 25Q",
                file: "Pharmacology/Exam 2/Pharmacology Exam 2 - Immunomodulators - 25 Questions.html",
                description: "25-question NCLEX-style clinical practice exam."
              },
              {
                version: "Immunomodulators",
                file: "Pharmacology/Exam 2/Pharmacology Exam 2 - Immunomodulators.html",
                description: "50-question focused review of immunomodulators, including Exam 1 content."
              },
              {
                version: "Immunomodulators V2",
                file: "Pharmacology/Exam 2/Pharmacology Exam 2 - Immunomodulators - Version 2.html",
                description: "50-question immunomodulator review, Version 2."
              },
              {
                version: "Anti-Inflammatories - 25Q",
                file: "Pharmacology/Exam 2/Pharmacology Exam 2 - Anti-Inflammatories - 25 Questions.html",
                description: "25-question NCLEX-style clinical practice exam."
              },
              {
                version: "Anti-Inflammatories",
                file: "Pharmacology/Exam 2/Pharmacology Exam 2 - Anti-Inflammatories.html",
                description: "50-question focused review of anti-inflammatory medications, including Exam 1 content."
              },
              {
                version: "Anti-Inflammatories V2",
                file: "Pharmacology/Exam 2/Pharmacology Exam 2 - Anti-Inflammatories - Version 2.html",
                description: "50-question anti-inflammatory review, Version 2."
              },
              {
                version: "Antineoplastics - 25Q",
                file: "Pharmacology/Exam 2/Pharmacology Exam 2 - Antineoplastics - 25 Questions.html",
                description: "25-question NCLEX-style clinical practice exam."
              },
              {
                version: "Antineoplastics",
                file: "Pharmacology/Exam 2/Pharmacology Exam 2 - Antineoplastics.html",
                description: "50-question focused review of antineoplastic medications, including Exam 1 content."
              },
              {
                version: "Antineoplastics V2",
                file: "Pharmacology/Exam 2/Pharmacology Exam 2 - Antineoplastics - Version 2.html",
                description: "50-question antineoplastic review, Version 2."
              },
              {
                version: "Anti-Infectives - 25Q",
                file: "Pharmacology/Exam 2/Pharmacology Exam 2 - Anti-Infectives - 25 Questions.html",
                description: "25-question NCLEX-style clinical practice exam."
              },
              {
                version: "Anti-Infectives",
                file: "Pharmacology/Exam 2/Pharmacology Exam 2 - Anti-Infectives.html",
                description: "50-question focused review of anti-infective medications, including Exam 1 content."
              },
              {
                version: "Anti-Infectives V2",
                file: "Pharmacology/Exam 2/Pharmacology Exam 2 - Anti-Infectives - Version 2.html",
                description: "50-question anti-infective review, Version 2."
              },
              {
                version: "2A",
                file: "Pharmacology/Exam 2/Pharmacology Exam 2a.html",
                description: "Practice version A with immediate feedback and rationales."
              },
              {
                version: "2B",
                file: "Pharmacology/Exam 2/Pharmacology Exam 2b.html",
                description: "Practice version B with immediate feedback, rationales, and linked references."
              },
              {
                version: "2C",
                file: "Pharmacology/Exam 2/Pharmacology Exam 2c.html",
                description: "Instructor-style NCLEX practice with immediate feedback and linked references."
              },
              {
                version: "2D",
                file: "Pharmacology/Exam 2/Pharmacology Exam 2d.html",
                description: "Shuffled NCLEX-style practice with immediate feedback and linked references."
              }
            ]
          }
        ]
      },

      // COURSE 3: Health Assessment
      {
        course: "Health Assessment",
        updatedAt: "2026-10-22",
        icon: "🩺",
        description: "Nursing assessment techniques, findings, documentation and clinical judgment",
        exams: [
          {
            name: "Exam 2",
            versions: [
              {
                version: "Health Assessment Exam 2 — Unified Bank",
                file: "exam.html?bank=health-assessment-exam-2-standard",
                description: "One 165-question deduplicated pool, with 50-question randomized exams following the Fall 2026 chapter, subtopic and 35/12/3 format blueprint."
              }            ]
          }
        ]
      },
      // COURSE 4: Fundamentals
      {
        course: "Fundamentals",
        updatedAt: "2026-10-22",
        icon: "📋",
        description: "Fundamentals of Nursing, patient safety, nursing care & clinical judgment",
        exams: [
          {
            name: "Exam 2",
            versions: [
              {
                version: "Standard Exam Engine",
                file: "exam.html?bank=fundamentals-exam-2-qa-standard",
                description: "50-question randomized practice exam following the Fundamentals Exam 2 topic, subtopic, and question-type blueprint."
              },
              {
                version: "Med Math Exam Engine",
                file: "exam.html?bank=fundamentals-exam-2-qa-med-math",
                description: "25 randomized medication math questions per attempt from the 79-question practice pool. No blueprint required."
              }
            ]
          }
        ]
      }

    ];
