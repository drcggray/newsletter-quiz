import { jsPDF } from "jspdf";

export const generateCertificate = async (userName, firstAttemptScore, score) => {
  try {
    console.log("Starting certificate generation...");
    
    const doc = new jsPDF();

    doc.setFont("helvetica", "normal");

    const addText = (text, x, y, fontSize, align = 'center') => {
      doc.setFontSize(fontSize);
      doc.text(text, x, y, { align });
    };

    addText('Certificate of Completion', 105, 20, 20);
    addText('This is to certify that', 105, 40, 14);
    addText(userName, 105, 50, 18);

    const text = [
      'has read the Kawakawa Maaori Health Email Newsletter',
      'containing summaries of peer-reviewed journal articles',
      'on Maaori health, equity, and cultural safety',
      'and completed the associated before-and-after quiz',
      'and achieved the following scores:'
    ];

    text.forEach((line, index) => {
      addText(line, 105, 70 + index * 7, 12);
    });

    addText(`Pre-reading score: ${firstAttemptScore}/5`, 105, 110, 12);
    addText(`Post-reading score: ${score}/5`, 105, 117, 12);

    addText('These activities required approximately 30 minutes', 105, 130, 12);
    addText('of continuing professional development (CPD) time', 105, 137, 12);

    addText(`Date: ${new Date().toLocaleDateString()}`, 105, 150, 12);

    // Add an empty line and then the URL
    addText("https://healthupdate.substack.com/", 105, 164, 12);

    doc.save('maaori_health_newsletter_certificate.pdf');
    console.log("PDF saved successfully.");

  } catch (error) {
    console.error("Error generating certificate:", error);
    throw error;
  }
};