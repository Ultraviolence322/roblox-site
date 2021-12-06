import fs from "fs";
import { parseName } from '../helpers/parseName'

const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
  const baseUrl = {
    development: "http://localhost:3000",
    production: "https://robloxmusiccodes.vercel.app",
  }[process.env.NODE_ENV];

  const staticPages = fs
    .readdirSync({
      development: 'pages',
      production: './',
    }[process.env.NODE_ENV])
    .filter((staticPage) => {
      return ![
        "404.tsx",
        "500.tsx",
        "index.tsx",
        "api",
        "artist",
        "sitemap.xml.js",
        "_app.tsx",
        "_document.tsx",
      ].includes(staticPage);
    })
    .map((staticPagePath) => {
      return `${baseUrl}/${staticPagePath}`;
    });

  const artistsResponse = await fetch('https://robloxmusics.com/wp-admin/admin-ajax.php?action=wp_ajax_ninja_tables_public_action&table_id=44266&target_action=get-all-data&default_sorting=old_first&ninja_table_public_nonce=bd0f5413fa')
  const artistsData = await artistsResponse.json() 

  const artists = artistsData.map(a => {
    const splittedName = parseName(a.value.singername).split(' ')
    return {
      id: splittedName.splice(0, splittedName.length - 2).join('-').toLocaleLowerCase()
    }
  })

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("")}
      ${artists
        .map(({ id }) => {
          return `
              <url>
                <loc>${baseUrl}/artist/${id}</loc>
                <lastmod>${new Date().toISOString()}</lastmod>
                <changefreq>monthly</changefreq>
                <priority>1.0</priority>
              </url>
            `;
        })
        .join("")}  
    </urlset>
  `;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;