import PDFDocument from "npm:pdfkit";

const line = (doc) =>
  doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor("#aaa").stroke()
    .moveDown(0.3);

const sectionTitle = (doc, title) => {
  doc.moveDown(0.5)
    .fontSize(12)
    .font("Helvetica-Bold")
    .fillColor("#1e1b4b")
    .text(title.toUpperCase(), { characterSpacing: 1 });
  line(doc);
  doc.font("Helvetica").fillColor("#000").fontSize(10);
};

const buildPdf = (resume) =>
  new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 50, size: "A4" });
    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => {
      const total = chunks.reduce((n, c) => n + c.length, 0);
      const result = new Uint8Array(total);
      let offset = 0;
      for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.length;
      }
      resolve(result);
    });

    const info = resume.personal_info || {};

    // Header
    doc.fontSize(22).font("Helvetica-Bold").fillColor("#1e1b4b")
      .text(info.full_name || "Resume", { align: "center" });

    if (info.headline) {
      doc.fontSize(11).font("Helvetica").fillColor("#555")
        .text(info.headline, { align: "center" });
    }

    const contacts = [
      info.email,
      info.phone,
      info.links?.linkedin,
      info.links?.github,
    ].filter(Boolean);
    if (contacts.length) {
      doc.fontSize(9).fillColor("#333")
        .text(contacts.join("  |  "), { align: "center" });
    }

    doc.fillColor("#000").fontSize(10).font("Helvetica");

    // Summary
    if (resume.summary?.professional_summary) {
      sectionTitle(doc, "Summary");
      doc.text(resume.summary.professional_summary, { lineGap: 2 });
    }

    // Work Experience
    if (resume.work_experience?.length) {
      sectionTitle(doc, "Work Experience");
      resume.work_experience.forEach((w) => {
        const dateStr = w.currently_working
          ? `${w.start_date || ""} – Present`
          : `${w.start_date || ""} – ${w.end_date || ""}`;

        doc.font("Helvetica-Bold").text(w.company_name || "", {
          continued: true,
        })
          .font("Helvetica").text(`   ${dateStr}`, { align: "right" });
        doc.font("Helvetica-Oblique")
          .text(`${w.job_title || ""}  ·  ${w.employment_type || ""}`);
        if (w.description) {
          doc.font("Helvetica").text(w.description, { indent: 10, lineGap: 2 });
        }
        doc.moveDown(0.5);
      });
    }

    // Education
    if (resume.education?.length) {
      sectionTitle(doc, "Education");
      resume.education.forEach((e) => {
        doc.font("Helvetica-Bold").text(e.institution_name || "", {
          continued: true,
        })
          .font("Helvetica").text(
            `   ${e.start_date || ""} – ${e.end_date || ""}`,
            { align: "right" },
          );
        doc.font("Helvetica")
          .text(
            `${e.education_level || ""} · ${e.degree || ""} in ${
              e.field_of_study || ""
            }`,
          );
        doc.moveDown(0.5);
      });
    }

    // Skills
    const skills = resume.skills;
    if (skills?.technical_skills?.length || skills?.soft_skills?.length) {
      sectionTitle(doc, "Skills");
      skills.technical_skills?.forEach((cat) => {
        doc.font("Helvetica-Bold").text(`${cat.category}: `, {
          continued: true,
        })
          .font("Helvetica").text(
            cat.skills?.map((s) => s.name).join(", ") || "",
          );
      });
      if (skills.soft_skills?.length) {
        doc.font("Helvetica-Bold").text("Soft Skills: ", { continued: true })
          .font("Helvetica").text(skills.soft_skills.join(", "));
      }
    }

    // Projects
    if (resume.projects?.length) {
      sectionTitle(doc, "Projects");
      resume.projects.forEach((p) => {
        doc.font("Helvetica-Bold").text(p.title || "");
        if (p.description) {
          doc.font("Helvetica").text(p.description, { indent: 10, lineGap: 2 });
        }
        if (p.technologies?.length) {
          doc.font("Helvetica-Bold").text("Tech: ", { continued: true })
            .font("Helvetica").text(p.technologies.join(", "));
        }
        doc.moveDown(0.5);
      });
    }

    doc.end();
  });

export const generatePdf = async (c) => {
  const { resume } = await c.req.json();
  const pdfBuffer = await buildPdf(resume);
  const name = (resume.personal_info?.full_name || "resume").replace(
    /\s+/g,
    "_",
  );

  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${name}_resume.pdf"`,
    },
  });
};
