export interface Article{
    id: string | number;
    sourceUrl?: string;
    title: string;
    description?: string;
    imageUrl?: string;
    publishedAt?: string | Date | null;
}

export interface CategoryChild{
    slug: string;
    name: string;
}

export interface Category{
    slug: string;
    name: string;
    rss: string;
    children?: CategoryChild[];
    eventTopics?: string[];
}