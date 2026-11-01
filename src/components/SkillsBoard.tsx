"use client";

import { useState } from "react";
import { skillCategories } from "@/lib/data";

export default function SkillsBoard() {
  const first = skillCategories[0]?.skills[0];
  const [active, setActive] = useState(first?.name ?? "");

  const selected =
    skillCategories.flatMap((category) => category.skills).find((skill) => skill.name === active) ?? first;

  return (
    <div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
        {skillCategories.map((category, index) => (
          <article key={category.id} className="border border-[#e3e5e0] bg-white rounded-lg p-4">
            <p className="font-mono text-[11px] tracking-wide text-[#0c6b74]">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-1 mb-3 text-sm font-semibold text-[#16181c]">{category.name}</h3>
            <ul className="space-y-1">
              {category.skills.map((skill) => {
                const on = skill.name === selected?.name;
                return (
                  <li key={skill.name}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(skill.name)}
                      onFocus={() => setActive(skill.name)}
                      onClick={() => setActive(skill.name)}
                      className={`w-full text-left font-mono text-xs px-2 py-1 rounded transition-colors ${
                        on ? "bg-[#111318] text-[#f4f5f2]" : "text-[#2a3038] hover:bg-[#f4f5f2]"
                      }`}
                    >
                      {skill.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>

      {selected && (
        <p className="mt-4 border border-[#e3e5e0] bg-white rounded-lg px-4 py-3 text-sm text-[#4e5563]">
          <span className="font-mono text-[#0c6b74]">{selected.name}</span>
          <span className="mx-2 text-[#c5c8c2]" aria-hidden="true">/</span>
          {selected.useCase}
        </p>
      )}
    </div>
  );
}
