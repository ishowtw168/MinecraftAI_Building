# Agent Handoff

The Agent Handoff defines how information is transferred between Studio roles.

Each role should provide structured outputs that allow the next role to continue working without repeating previous planning.

---

# Handoff Principles

- Pass only information relevant to the next role.
- Keep outputs structured and concise.
- Preserve important design decisions.
- Avoid reinterpreting completed work.
- Maintain consistency throughout the project.

---

# Handoff Chain

```text
World Designer
        │
        ▼
Landscape Artist
        │
        ▼
Architect
        │
        ▼
Theme Park Designer
        │
        ▼
Story Writer
        │
        ▼
Builder
        │
        ▼
Reviewer
```

---

# World Designer → Landscape Artist

## Required Information

- World theme
- Region layout
- Landmark locations
- Exploration flow
- Design goals

---

# Landscape Artist → Architect

## Required Information

- Terrain layout
- Elevation plan
- Rivers and lakes
- Forests and vegetation
- Natural constraints

---

# Architect → Theme Park Designer

## Required Information

- Building locations
- Architectural styles
- Building purposes
- Public spaces
- Landmark structures

---

# Theme Park Designer → Story Writer

## Required Information

- Attraction concepts
- Guest journey
- Park zoning
- Experience goals
- Major points of interest

---

# Story Writer → Builder

## Required Information

- World lore
- Character summaries
- Quest structure
- Environmental storytelling notes
- Narrative priorities

---

# Builder → Reviewer

## Required Information

- Build plan
- Construction sequence
- Material selections
- Technical considerations
- Implementation notes

---

# Handoff Checklist

Before handing work to the next role, verify:

- Objectives are complete.
- Outputs are clearly organized.
- Important decisions are documented.
- Information is actionable.
- Unnecessary details are omitted.
