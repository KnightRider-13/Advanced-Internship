export type BookType = {
      bookId: string;
      id: string;
      title: string;
      author: string;
      subTitle: string;
      status: "saved" | "finished" | "unfinished"; 
      audioLink: string;
      imageLink: string;
      averageRating: number;
      totalRating: number;
      keyIdeas: number;
      type: string;
      subscriptionRequired: boolean;
      summary: string;
      tags: string[];
      bookDescription: string;
      authorDescription: string;
}