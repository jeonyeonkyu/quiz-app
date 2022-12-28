export const formatTime = (ms: number) => {
  const hour = Math.floor(ms / 1000 / 3600)
  const min = Math.floor(((ms / 1000) % 3600) / 60)
  const sec = Math.floor((ms / 1000) % 60)
  const hourString = hour < 10 ? `0${hour}` : hour
  const minString = min < 10 ? `0${min}` : min
  const secString = sec < 10 ? `0${sec}` : sec
  return `${hourString}:${minString}:${secString}`
}
