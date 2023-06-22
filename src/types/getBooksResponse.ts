export type GetBooksResponse = Array<{
  id: string;
  title: string;
  authors: Array<string>;
  rating: number;
  startedAt: string;
  coverUrl: string;
}>; 