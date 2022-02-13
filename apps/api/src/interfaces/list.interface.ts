export interface IList {
    data: any[] | any;
    paging?: {
      pages: number;
      currentPage: number;
      pageSize: number;
    };
    message?:string;
  }
  