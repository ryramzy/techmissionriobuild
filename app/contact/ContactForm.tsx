"use client";

import { useState } from "react";
import { Button } from "@/components/Button/Button";
import { type ContactFormData, contactFormSchema } from "@/lib/schemas/contact";
import { useTranslations } from "next-intl";

const INITIAL_FORM_DATA: ContactFormData = {
  name: "",
  email: "",
  subject: undefined,
  message: "",
}

export default function ContactForm() {
  const [formData, setFormData] = useState<Partial<ContactFormData>>(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const t = useTranslations("Contact")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const result = contactFormSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      Object.entries(result.error.flatten().fieldErrors).forEach(([key, messages]) => {
        if (messages?.[0]) fieldErrors[key] = messages[0]
      })
      setErrors(fieldErrors)
      return
    }

    // TODO: Wire to API route when ready. API must validate with Zod and apply rate limiting.
    console.log("Form submitted:", result.data)
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear field error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
          {t("nameLabel")}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name ?? ""}
          onChange={handleChange}
          maxLength={200}
          className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
          required
        />
        {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
          {t("emailLabel")}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email ?? ""}
          onChange={handleChange}
          maxLength={254}
          className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
          required
        />
        {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
          {t("subjectLabel")}
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject ?? ""}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
          required
        >
          <option value="">{t("subjectSelect")}</option>
          <option value="volunteer">{t("subjectVolunteer")}</option>
          <option value="partnership">{t("subjectPartnership")}</option>
          <option value="donation">{t("subjectDonation")}</option>
          <option value="programs">{t("subjectPrograms")}</option>
          <option value="other">{t("subjectOther")}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
          {t("messageLabel")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message ?? ""}
          onChange={handleChange}
          maxLength={5000}
          className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
          required
        />
        {errors.message && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
      </div>

      <Button type="submit" className="w-full">
        {t("sendButton")}
      </Button>
    </form>
  );
}
