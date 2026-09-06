import { STATIC_PROJECTS } from "../data/projects.data";
import { ProjectDetail, ProjectSummary } from "../types/api.types";
import { ProjectQuery } from "../validators/project.validator";

export class ProjectService {
  /**
   * Returns list of project summaries.
   * Portfolio content is static, avoiding unnecessary database queries.
   */
  public getProjects(query?: ProjectQuery): ProjectSummary[] {
    let list = STATIC_PROJECTS.map(
      ({
        slug,
        title,
        clientName,
        industry,
        projectType,
        tagline,
        year,
        techStack,
        thumbnailUrl,
        badge,
      }) => ({
        slug,
        title,
        clientName,
        industry,
        projectType,
        tagline,
        year,
        techStack,
        thumbnailUrl,
        badge,
      })
    );

    if (query?.industry) {
      const ind = query.industry.toLowerCase();
      list = list.filter((p) => p.industry.toLowerCase().includes(ind));
    }

    if (query?.projectType) {
      const pt = query.projectType.toLowerCase();
      list = list.filter((p) => p.projectType.toLowerCase().includes(pt));
    }

    if (query?.limit && query.limit > 0) {
      list = list.slice(0, query.limit);
    }

    return list;
  }

  /**
   * Retrieves a single project detail by its URL slug.
   */
  public getProjectBySlug(slug: string): ProjectDetail | null {
    const normalizedSlug = slug.toLowerCase().trim();
    const found = STATIC_PROJECTS.find((p) => p.slug.toLowerCase() === normalizedSlug);
    return found || null;
  }
}

export const projectService = new ProjectService();
