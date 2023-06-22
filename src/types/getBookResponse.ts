export type GetBookResponse = {
  id: string;
  title: string;
  authors: Array<string>;
  rating: number;
  startedAt: string;
  finishedAt?: string;
  coverUrl: string;
  pageCount: number;
  review?: string;
}; 