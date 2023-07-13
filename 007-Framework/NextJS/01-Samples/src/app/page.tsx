const pages = [
  {
    title: "圈圈叉叉小遊戲",
    url: "/tic-tac-toe"
  },
  {
    title: "計算機",
    url: "/calculator"
  }
];

function IndexList({ title, url }) {
  return <li>
    <a href={url}>{title}</a>
  </li>
}




export default function Home() {
  return (
    <>
      <div>
      <h1>Welcome to React</h1>
      </div>
      <div>
        <h1>Samples</h1>
        <ul>
          {pages.map(value => <IndexList title={value.title} url={value.url} />)}
        </ul>
      </div>
    </>
  )
}
