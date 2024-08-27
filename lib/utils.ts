import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
interface PublishedDocument {
  id: any;
  title: string;
  partialContent: string;
  isPublished: boolean;
  publishedAt: string | undefined;
}

const publishedDocuments: PublishedDocument[] = [];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function extractPartialContent(content: string): string {
  
  let parsedContent;
  try {
    parsedContent = JSON.parse(content);
  } catch (error) {
    console.error("Error parsing content:", error);
    return "click to read the full articles";
  }
  
  let partialContent = "";
  
  try {
    parsedContent.forEach((item: any) => {
      if (item.content && item.content.length > 0 && item.content[0].type === "text") {
        partialContent += item.content[0].text + " ";
      }
    });
  } catch (error) {
    console.error("Error parsing content:", error);
    return "Error parsing content. Please try again.";
  }

  return partialContent.trim();
}

export function sortPosts(posts: Array<PublishedDocument>) {
  
  return posts.sort((a, b) => {
    if (a.publishedAt && b.publishedAt) {
      if (a.publishedAt > b.publishedAt) return -1;
      if (a.publishedAt < b.publishedAt) return 1;
    }
    return 0;
  });
}

