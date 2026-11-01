"use client";

import { useMemo, useState } from "react";

const entries = [
  { en: "Ministries", ne: "मन्त्रालय", kind: "Directory" },
  { en: "Passport", ne: "राहदानी", kind: "Citizen service" },
  { en: "PAN", ne: "प्यान", kind: "Citizen service" },
  { en: "NID", ne: "राष्ट्रिय परिचयपत्र", kind: "Citizen service" },
  { en: "Driving license", ne: "सवारी अनुमतिपत्र", kind: "Citizen service" },
  { en: "Citizenship", ne: "नागरिकता", kind: "Citizen service" },
  { en: "Local government", ne: "स्थानीय तह", kind: "Directory" },
  { en: "Provinces", ne: "प्रदेश", kind: "Directory" },
];

export default function LinkGovPreview() {
  const [query, setQuery] = useState("");
  const [lang, setLang] = useState<"en" | "ne">("en");
  const [active, setActive] = useState(entries[1].en);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((item) =>
      `${item.en} ${item.ne} ${item.kind}`.toLowerCase().includes(q)
    );
  }, [query]);

  const selected = entries.find((item) => item.en === active) ?? visible[0];

  return (
    <div className="w-full rounded-lg border border-[#d7dbd4] bg-white overflow-hidden">
      <div className="px-4 py-2.5 border-b border-[#e3e5e0] flex items-center gap-3 bg-[#f7f8f5]">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e7c1bd]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ead7a8]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#b7d7c5]" />
        </div>
        <p className="flex-1 font-mono text-[11px] text-[#4e5563] truncate">linktogovernment.com</p>
        <div className="flex rounded-md border border-[#d7dbd4] overflow-hidden text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`px-2 py-1 ${lang === "en" ? "bg-[#111318] text-[#f4f5f2]" : "text-[#4e5563]"}`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLang("ne")}
            className={`px-2 py-1 ${lang === "ne" ? "bg-[#111318] text-[#f4f5f2]" : "text-[#4e5563]"}`}
          >
            ने
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <label className="sr-only" htmlFor="ltg-search">Search the directory preview</label>
        <input
          id="ltg-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={lang === "en" ? "Search ministries, services" : "मन्त्रालय, सेवा खोज्नुहोस्"}
          className="w-full rounded-md border border-[#d7dbd4] px-3 py-2 text-sm text-[#16181c] outline-none focus:border-[#0c6b74]"
        />
        <ul className="grid grid-cols-2 gap-2">
          {visible.map((item) => {
            const on = item.en === selected?.en;
            return (
              <li key={item.en}>
                <button
                  type="button"
                  onClick={() => setActive(item.en)}
                  className={`w-full text-left rounded-md border px-2.5 py-2 text-xs ${
                    on ? "border-[#0c6b74] bg-[#f3f8f8] text-[#16181c]" : "border-[#e3e5e0] text-[#2a3038]"
                  }`}
                >
                  <span className="block font-medium">{lang === "en" ? item.en : item.ne}</span>
                  <span className="block text-[10px] text-[#4e5563] mt-0.5">{item.kind}</span>
                </button>
              </li>
            );
          })}
          {visible.length === 0 && (
            <li className="col-span-2 text-xs text-[#4e5563]">No match in this preview.</li>
          )}
        </ul>
        {selected && (
          <p className="text-xs text-[#4e5563] border-t border-[#e3e5e0] pt-3">
            <span className="font-semibold text-[#16181c]">{lang === "en" ? selected.en : selected.ne}</span>
            {" "}opens the official site. Each URL keeps a last-verified date.
          </p>
        )}
      </div>
    </div>
  );
}
