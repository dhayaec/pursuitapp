import { Avatar, Block, InlineFlex } from 'reakit';
import Header from '../components/ui/Header';

export default () => (
  <div>
    <Header logo="MyWebsite" />
    <h1>Contact Us</h1>
    <InlineFlex justifyContent="space-evenly" width="100%">
      <Block
        width="100px"
        height="100px"
        backgroundColor="rgb(219, 112, 147)"
      />
      <Block
        width="100px"
        height="100px"
        backgroundColor="rgb(219, 112, 198)"
      />
      <Block width="100px" height="100px" backgroundColor="rgb(205, 112, 219)">
        <Avatar src="https://placekitten.com/100/100" alt="Kitten" />
      </Block>
    </InlineFlex>
  </div>
);
