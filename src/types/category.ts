export interface Category {
    id: string;
    title: string;
    description: string;
    icon?: React.ReactNode | undefined;
    isEndpoint?: boolean;
  }