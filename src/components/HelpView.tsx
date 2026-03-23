import { AlertCircle, Copy, FolderOpen, Layout, Phone, Printer } from "lucide-react";
import React from "react";

interface Section {
  title: string;
  body: string;
  icon: React.ReactNode;
  phone?: boolean;
}

const HOW_TO: Section[] = [
  {
    title: "Open a File",
    body: "Click Open file → select your file from the file browser window.",
    icon: <FolderOpen size={16} className="text-blue-600" />,
  },
  {
    title: "Adjust Margins",
    body:
      "In the settings panel, choose a preset or set your custom margin size. Consider selecting “narrow” if the red cutoff warning is visible.",
    icon: <Layout size={16} className="text-blue-600" />,
  },
  {
    title: "Double-sided Printing",
    body:
      "In the settings panel, toggle Double-sided on. You can also select which side you want it to flip on.",
    icon: <Copy size={16} className="text-blue-600" />,
  },
  {
    title: "Send to Printer",
    body:
      "Click the Print button in the top right corner. A confirmation dialog shows printer location and quota cost.",
    icon: <Printer size={16} className="text-blue-600" />,
  },
];

const TROUBLESHOOT: Section[] = [
  {
    title: "Nothing is printing",
    body: "Confirm printer location and check that your job is in queue.",
    icon: <AlertCircle size={16} className="text-blue-600" />,
  },
  {
    title: "The wrong pages were printed",
    body:
      "Double check the page range settings. You can enter specific page numbers (e.g., 3) or ranges (e.g., 4-10).",
    icon: <AlertCircle size={16} className="text-blue-600" />,
  },
  {
    title: "Still having issues?",
    body: "",
    icon: <Phone size={16} className="text-blue-600" />,
    phone: true,
  },
];

export function HelpView() {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden min-h-0 min-w-0">
      <div className="flex-1 px-10 py-5 min-h-0">
        <h2 className="text-blue-600 font-sans font-bold text-xl mb-3">
          Help &amp; Instructions
        </h2>

        {/* how to stuff */}
        {HOW_TO.map((s) => (
          <div key={s.title} className="mb-3 flex gap-3 items-start">
            <div className="mt-0.5">{s.icon}</div>
            <div>
              <p className="font-sans font-bold text-slate-800 text-sm">
                {s.title}
              </p>
              <p className="font-mono text-slate-500 text-xs leading-relaxed">
                {s.body}
              </p>
            </div>
          </div>
        ))}

        {/* troubleshooting */}
        <h2 className="text-blue-600 font-sans font-bold text-xl mt-5 mb-3">
          Troubleshoot
        </h2>

        {TROUBLESHOOT.map((s) => (
          <div key={s.title} className="mb-3 flex gap-3 items-start">
            <div className="mt-0.5">{s.icon}</div>
            <div>
              <p className="font-sans font-bold text-slate-800 text-sm">
                {s.title}
              </p>

              {s.phone ? (
                <p className="font-mono text-slate-500 text-xs leading-relaxed">
                  Contact{" "}
                  <a
                    href="tel:4169782011"
                    className="text-blue-600 underline"
                  >
                    416-978-2011
                  </a>{" "}
                  or visit the Bahen Information Desk.
                </p>
              ) : (
                <p className="font-mono text-slate-500 text-xs leading-relaxed">
                  {s.body}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}