const hasOneHourPassed = (pastTimestamp) => {
  const oneHourInMs = 60 * 60 * 1000; // 1 hora em milissegundos
  const now = Date.now();

  return now - pastTimestamp >= oneHourInMs;
}

export default hasOneHourPassed;