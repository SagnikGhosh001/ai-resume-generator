const storeAndRedirect = (resume) => {
  sessionStorage.setItem("resume", JSON.stringify(resume));
  globalThis.window.location.href = "/resume";
};

export const submitForm = async (formData) => {
  const res = await fetch("/generate", { method: "POST", body: formData });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Server error: ${res.status}`);
  }

  const resume = await res.json();
  storeAndRedirect(resume);
};
