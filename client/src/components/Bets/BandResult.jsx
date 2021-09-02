const BandResult = ({result}) => {
  return (
    <div className={`band ` + result.toLowerCase()}>
      {result}
    </div>
  )
}

export default BandResult