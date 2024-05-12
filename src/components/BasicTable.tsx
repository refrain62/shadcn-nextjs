import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const BasicTable = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts: Post[] = await response.json();

  return (
    <div>
      <Table>
        <TableCaption>A list of posts</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>userId</TableHead>
            <TableHead>Id</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Body</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.userId}</TableCell>
              <TableCell>{post.id}</TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.body}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BasicTable;
