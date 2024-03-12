import ThemeContext from "./context/theme.context"

function HomeBanner() {
  return (
    <div>
      <ThemeContext.Consumer>
        {
          value => {
            return <h2>HomeBanner-{value.color}</h2>
          }
        }
      </ThemeContext.Consumer>
    </div>
  )
}

export default HomeBanner