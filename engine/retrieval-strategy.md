# Retrieval Strategy

The Retrieval Strategy defines how Minecraft AI Studio selects relevant knowledge before an AI role begins its work.

The goal is to provide each role with only the information necessary for the current task.

---

# Objectives

- Reduce unnecessary context.
- Improve response quality.
- Keep role responsibilities focused.
- Enable scalable knowledge retrieval.

---

# Retrieval Principles

## Relevance First

Retrieve only knowledge directly related to the current task.

Example

A medieval castle project should retrieve medieval architecture, not modern architecture.

---

## Role-Aware Retrieval

Different Studio roles require different knowledge.

Examples

World Designer

- Fundamentals
- Landscape
- Story

Architect

- Architecture
- Fundamentals
- Story

Theme Park Designer

- Theme Park
- Story

---

## Theme-Aware Retrieval

Prioritize knowledge matching the project's theme.

Examples

Ancient Egypt

- Ancient Egyptian architecture (future)
- Desert landscape
- Worldbuilding
- Environmental Storytelling

Steampunk

- Steampunk architecture
- Industrial landscapes
- Story

---

## Progressive Retrieval

Retrieve only what is needed for the current stage.

Example

World Designer should not retrieve Builder-specific knowledge.

---

# Retrieval Order

1. User Request
2. Current Studio Role
3. Project Theme
4. Required Knowledge Categories
5. Relevant Knowledge Documents
6. AI Generation

---

# Design Principles

- Retrieve the minimum useful context.
- Avoid duplicate information.
- Prefer highly relevant knowledge over large amounts of knowledge.
- Allow retrieval rules to evolve as the Knowledge Base grows.
