# -*- coding: utf-8 -*-
$ErrorActionPreference = "Stop"

$logoSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" fill="none" style="width:100%;height:100%"><g transform="translate(10, 10)"><path d="M30 55 C16 55 8 44 8 28 C8 12 18 2 30 2 C42 2 52 12 52 28 C52 44 44 55 30 55 Z" fill="#1E1E24"/><path d="M18 16 C22 8 28 6 34 6" stroke="#F2A93B" stroke-width="3.5" stroke-linecap="round"/><path d="M38 10 L41 3 L44 10 L51 13 L44 16 L41 23 L38 16 L31 13 Z" fill="#F2A93B"/><circle cx="23" cy="27" r="2.5" fill="#FFFFFF"/><circle cx="37" cy="27" r="2.5" fill="#FFFFFF"/><path d="M25 36 C27 40 33 40 35 36" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/></g></svg>'

$logoSvgInvert = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" fill="none" style="filter: invert(1) brightness(2); width:100%;height:100%"><g transform="translate(10, 10)"><path d="M30 55 C16 55 8 44 8 28 C8 12 18 2 30 2 C42 2 52 12 52 28 C52 44 44 55 30 55 Z" fill="#1E1E24"/><path d="M18 16 C22 8 28 6 34 6" stroke="#F2A93B" stroke-width="3.5" stroke-linecap="round"/><path d="M38 10 L41 3 L44 10 L51 13 L44 16 L41 23 L38 16 L31 13 Z" fill="#F2A93B"/><circle cx="23" cy="27" r="2.5" fill="#FFFFFF"/><circle cx="37" cy="27" r="2.5" fill="#FFFFFF"/><path d="M25 36 C27 40 33 40 35 36" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/></g></svg>'

$files = @(
    'bald_bold_1\code.html',
    'bald_bold_2\code.html',
    'bald_bold_3\code.html',
    'bald_bold_4\code.html',
    'bald_bold_5\code.html',
    'bald_bold_6\code.html'
)

foreach ($file in $files) {
    Write-Host "Processing: $file"
    
    $content = [System.IO.File]::ReadAllText($file, [System.Text.UTF8Encoding]::new($true))
    
    # Replace logo
    $content = $content -replace '<img alt="Bald &amp; Bold Logo"[^>]*?src="https://lh3\.googleusercontent\.com[^"]*"[^>]*?/?>', $logoSvg
    $content = $content -replace '<img alt="Bald & Bold Logo"[^>]*?src="https://lh3\.googleusercontent\.com[^"]*"[^>]*?/?>', $logoSvg
    
    # Replace inverted logo for footer
    $pattern = '<img\s+alt="Bald &amp; Bold Logo"\s+class="[^"]*invert[^"]*"[^>]*?src="https://lh3\.googleusercontent\.com[^"]*"[^>]*?/?>'
    if ($content -match $pattern) {
        $content = $content -replace $pattern, $logoSvgInvert
    }
    
    # Replace prices (RUB to BYN)
    $content = $content -replace '1 890 ₽', '62.37 Br'
    $content = $content -replace '1 450 ₽', '47.85 Br'
    $content = $content -replace '990 ₽', '32.67 Br'
    $content = $content -replace '650 ₽', '21.45 Br'
    $content = $content -replace '1 290 ₽', '42.57 Br'
    $content = $content -replace '2 400 ₽', '79.20 Br'
    $content = $content -replace '2 300 ₽', '75.90 Br'
    $content = $content -replace '472 ₽', '15.58 Br'
    $content = $content -replace '490 ₽', '16.17 Br'
    $content = $content -replace '940,5 ₽', '31.04 Br'
    $content = $content -replace '4 990 ₽', '164.67 Br'
    $content = $content -replace '2 880 ₽', '95.04 Br'
    $content = $content -replace '1 300 ₽', '42.90 Br'
    $content = $content -replace '890 ₽', '29.37 Br'
    $content = $content -replace '1 500 ₽', '49.50 Br'
    $content = $content -replace '8 500 ₽', '280.50 Br'
    $content = $content -replace '400 ₽', '13.20 Br'
    $content = $content -replace '500 ₽', '16.50 Br'
    $content = $content -replace 'Цена, ₽', 'Цена, Br'
    $content = $content -replace '1 балл = 1 ₽', '1 балл = 0.03 Br'
    
    # Update navigation hrefs
    $content = $content -replace 'href="#catalog"', 'href="../bald_bold_2/code.html"'
    
    [System.IO.File]::WriteAllText($file, $content, [System.Text.UTF8Encoding]::new($false))
    
    Write-Host "Done: $file"
}

Write-Host "`nAll files updated successfully!"
