"use client";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import Link from "next/link";
import { useMemo } from "react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import { PostItem } from "@/components/post-item";
import { QueryPagination } from "@/components/query-pagination";
import { Metadata } from "next";
import { sortPosts } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


const POSTS_PER_PAGE = 3;

interface BlogPageProps {
  searchParams: {
    myArticles?: string;
    page?: string;
  };
}

interface PublishedDocument{
  id: Id<"documents">;
  title: string;
  partialContent: string;
  publishedAt: string;
  isPublished: boolean;
}

export default function JournalPage({ searchParams }: BlogPageProps) {
  /* trunk-ignore(eslint/react-hooks/rules-of-hooks) */
  const { isAuthenticated, isLoading } = useConvexAuth();
  let myArticles = useQuery(api.documents.getMyDocuments);;
  let allArticles = useQuery(api.documents.getPublishedDocuments);
  let documents;
  
  if (typeof searchParams?.page === "string" && isNaN(Number(searchParams.page))) {
    return <div>Invalid page number</div>;
  }

  if (typeof searchParams?.myArticles === "string" && searchParams.myArticles !== "true") {
    return <div>Invalid filter</div>;
  }

  if (!isAuthenticated || searchParams?.myArticles !== "true") {
    documents = myArticles
  }else
    documents = allArticles

 
  const currentPage = Number(searchParams?.page) || 1;
  
  const sortedPosts = documents ? sortPosts(documents.filter((document) => document.isPublished) as PublishedDocument[]) : [];
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  );

  if (documents === undefined) {
    return (
      <div>
        <Skeleton className="h-14 w-[50%]" />
        <Skeleton className="h-4 w-[80%]" />
        <Skeleton className="h-4 w-[40%]" />
        <Skeleton className="h-4 w-[60%]" />
      </div>
    );
  }

  if (documents === null) {
    return <div>No documents found</div>;
  }

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">Decentralized Journal</h1>
          <p className="text-xl text-muted-foreground">
            Read, buy, list and sell your Articles as NFTs
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 mt-8">
        <div className="col-span-12 col-start-1 sm:col-span-8">
          <hr />
          {displayPosts?.length > 0 ? (
            <ul className="flex flex-col">
              {displayPosts.map((document) => {
                return (
                  <li key={document.id}>
                    <PostItem
                      slug={document.id}
                      title={document.title}
                      description={document.partialContent}
                      date={document.publishedAt ?? ""}
                      tags={[]}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>{searchParams?.myArticles === "true" ? "You have no articles" : "There are no published articles yet"}</p>
          )}
          <QueryPagination
            totalPages={totalPages}
            className="justify-end mt-4"
          />
        </div>
          
      </div>
    </div>
  );
};


