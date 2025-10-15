import CountdownDisplay from '../components/countdownDisplay';

function Home () {
  return (
    <>
      <h1>Count down</h1>
      <CountdownDisplay targetTime="2025-11-15T00:00:00" />
    </>
  )
}

export default Home;