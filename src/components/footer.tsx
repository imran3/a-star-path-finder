import { FooterStyled } from './styles';

export const Footer = () => {
  return (
    <FooterStyled>
      <p>
        Made with &nbsp;
        <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
          React
        </a>
        &nbsp; by&nbsp;&nbsp;
        <a href="https://github.com/imran3" target="_blank" rel="noreferrer">
          Imran Azam
        </a>
        &nbsp;-&nbsp;
        <a
          href="https://github.com/imran3/a-star-path-finder"
          target="_blank"
          rel="noreferrer"
        >
          Source code
        </a>
      </p>
    </FooterStyled>
  );
};
