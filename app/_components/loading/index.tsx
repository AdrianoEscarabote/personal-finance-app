import { LoadingProps } from "./loadingProps"
import style from "./style.module.css"

const Loading = ({ theme }: LoadingProps) => {
  return (
    <svg className={style.spinner} viewBox="0 0 50 50">
      <circle
        className={style.path}
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="7"
        stroke={`${theme === "dark" ? "#201f24" : "#fff"}`}
      ></circle>
    </svg>
  )
}

export default Loading
