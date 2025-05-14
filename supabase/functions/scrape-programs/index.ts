import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import * as cheerio from 'npm:cheerio@1.0.0-rc.12';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Add user agent to avoid being blocked
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const programs = [];

    // Common selectors for course/program elements
    const selectors = [
      '.course-card',
      '.program-card',
      '.degree-program',
      '[class*="course"]',
      '[class*="program"]',
      'article',
      '.search-result'
    ];

    // Find all potential program containers
    $(selectors.join(', ')).each((_, element) => {
      const $el = $(element);
      
      // Look for title in common heading elements
      const titleEl = $el.find('h1, h2, h3, h4, .title, [class*="title"], [class*="course-name"]').first();
      const title = titleEl.text().trim();
      
      if (!title) return;

      // Extract program details
      const program = {
        title,
        description: $el.find('p, .description, [class*="description"], [class*="summary"]').first().text().trim(),
        qualification: $el.find('[class*="qualification"], [class*="degree"], [class*="award"]').first().text().trim(),
        duration: $el.find('[class*="duration"], [class*="length"], time').first().text().trim(),
        startDate: $el.find('[class*="start"], [class*="date"], [class*="intake"]').first().text().trim(),
        url: titleEl.closest('a').attr('href') || $el.find('a').first().attr('href')
      };

      // Clean up the data
      Object.keys(program).forEach(key => {
        if (typeof program[key] === 'string') {
          program[key] = program[key].replace(/\s+/g, ' ').trim();
        }
      });

      // Only add if we have meaningful data
      if (program.title && (program.description || program.qualification || program.duration)) {
        // Fix relative URLs
        if (program.url && !program.url.startsWith('http')) {
          try {
            const baseUrl = new URL(url);
            program.url = new URL(program.url, baseUrl.origin).toString();
          } catch (e) {
            console.error('Failed to parse URL:', e);
          }
        }
        
        programs.push(program);
      }
    });

    return new Response(
      JSON.stringify({ programs }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Scraping error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to scrape programs',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});