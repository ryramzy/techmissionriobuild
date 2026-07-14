import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://techmissionrio.org"

  const routes = [
    "",
    "/about",
    "/fellows",
    "/partner",
    "/donate",
    "/contact",
    "/privacy",
    "/terms",
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/fellows" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/about" || route === "/fellows" ? 0.8 : 0.6,
  }))
}
