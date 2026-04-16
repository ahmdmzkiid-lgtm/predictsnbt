import axios from 'axios';
import https from 'https';
import * as cheerio from 'cheerio';

const agent = new https.Agent({ rejectUnauthorized: false });

async function test() {
  try {
    const res = await axios.get('https://sidata-ptn-snpmb.bppp.kemdikbud.go.id/ptn_sn.php', { httpsAgent: agent, timeout: 5000 });
    const $ = cheerio.load(res.data);
    const text = $('body').text().replace(/\s+/g, ' ').substring(0, 1000);
    console.log('Success, preview:', text);
  } catch (err) {
    console.error('Error fetching SNPMB:', err.message);
  }
}

test();
