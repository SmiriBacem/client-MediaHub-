export interface IMovie {
    id: number;
    Title: string;
    "US Gross"?: number;
    "US DVD Sales"?: number;
    "Worldwide Gross"?: number;
    "Production Budget"?: number;
    "Release Date"?: string;
    Distributor?: string;
    "IMDB Rating"?: number;
    "IMDB Votes"?: number;
    "Major Genre"?: string;
    Director?: string;
    "Rotten Tomatoes Rating"?: string;
    _id?:string;
  }

export interface IMovieTri {
    selectedTriVal : string, 
    setSelectedTriVal : Function
  }
  