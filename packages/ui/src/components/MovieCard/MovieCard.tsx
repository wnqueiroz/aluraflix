import * as s from "./MovieCard.styles";

export type MovieCardProps = {
  image: string;
  onHoverMovie?: () => void;
};

export const MovieCard = ({
  image,
  onHoverMovie: onHoverMovie = () => {},
}: MovieCardProps) => {
  return (
    <s.Wrapper>
      <s.Cover onMouseEnter={onHoverMovie} src={image} loading="lazy" />
    </s.Wrapper>
  );
};
