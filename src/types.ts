

export type Issue = {
  id: number;
  title: string;
  description: string;
  status: "PENDING" | "RESOLVED";
  createdAt: string;
  updatedAt: string;
  reportedByUsername: string;
};

export type IssueCreate = {
    title: string
    description: string;
}

export type UserRole = "USER" | "ADMIN"
export type IssueStatus = "PENDING" | "RESOLVED"

export interface IUser {
    id?: string;
    username: string;
    role: UserRole;
}



