# PowerShell скрипт для обновления всех HTML файлов

$logoSvg = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" fill="none" style="width:100%;height:100%">
  <g transform="translate(10, 10)">
    <path d="M30 55 C16 55 8 44 8 28 C8 12 18 2 30 2 C42 2 52 12 52 28 C52 44 44 55 30 55 Z" fill="#1E1E24"/>
    <path d="M18 16 C22 8 28 6 34 6" stroke="#F2A93B" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M38 10 L41 3 L44 10 L51 13 L44 16 L41 23 L38 16 L31 13 Z" fill="#F2A93B"/>
    <circle cx="23" cy="27" r="2.5" fill="#FFFFFF"/>
    <circle cx="37" cy="27" r="2.5" fill="#FFFFFF"/>
    <path d="M25 36 C27 40 33 40 35 36" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
  </g>
</svg>
'@

$logoSvgInvert = @'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" fill="none" style="filter: invert(1) brightness(2); width:100%;height:100%">
  <g transform="translate(10, 10)">
    <path d="M30 55 C16 55 8 44 8 28 C8 12 18 2 30 2 C42 2 52 12 52 28 C52 44 44 55 30 55 Z" fill="#1E1E24"/>
    <path d="M18 16 C22 8 28 6 34 6" stroke="#F2A93B" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M38 10 L41 3 L44 10 L51 13 L44 16 L41 23 L38 16 L31 13 Z" fill="#F2A93B"/>
    <circle cx="23" cy="27" r="2.5" fill="#FFFFFF"/>
    <circle cx="37" cy="27" r="2.5" fill="#FFFFFF"/>
    <path d="M25 36 C27 40 33 40 35 36" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
  </g>
</svg>
'@

# Таблица конвертации цен (RUB -> BYN, курс 1 RUB = 0.033 BYN)
$priceMap = @{
    '1 890 ₽' = '62.37 Br'
    '1 450 ₽' = '47.85 Br'
    '990 ₽' = '32.67 Br'
    '650 ₽' = '21.45 Br'
    '1 290 ₽' = '42.57 Br'
    '2 400 ₽' = '79.20 Br'
    '2 300 ₽' = '75.90 Br'
    '472 ₽' = '15.58 Br'
    '490 ₽' = '16.17 Br'
    '940,5 ₽' = '31.04 Br'
    '4 990 ₽' = '164.67 Br'
    '2 880 ₽' = '95.04 Br'
    '1 300 ₽' = '42.90 Br'
    '890 ₽' = '29.37 Br'
    '1 500 ₽' = '49.50 Br'
    '8 500 ₽' = '280.50 Br'
    '400 ₽' = '13.20 Br'
    '500 ₽' = '16.50 Br'
    'Цена, ₽' = 'Цена, Br'
    '1 балл = 1 ₽' = '1 балл = 0.03 Br'
}

$files = @(
    'c:\Users\Ruslan\Desktop\stitch_bald_bold_storefront_mockup\bald_bold_1\code.html',
    'c:\Users\Ruslan\Desktop\stitch_bald_bold_storefront_mockup\bald_bold_2\code.html',
    'c:\Users\Ruslan\Desktop\stitch_bald_bold_storefront_mockup\bald_bold_3\code.html',
    'c:\Users\Ruslan\Desktop\stitch_bald_bold_storefront_mockup\bald_bold_4\code.html',
    'c:\Users\Ruslan\Desktop\stitch_bald_bold_storefront_mockup\bald_bold_5\code.html',
    'c:\Users\Ruslan\Desktop\stitch_bald_bold_storefront_mockup\bald_bold_6\code.html'
)

foreach ($file in $files) {
    Write-Host "Обработка файла: $file"
    
    $content = Get-Content $file -Raw -Encoding UTF8
    
    # 1. Заменить логотип (обычный)
    $content = $content -replace '<img alt="Bald &amp; Bold Logo"[^>]*src="https://lh3\.googleusercontent\.com/aida/[^"]*"[^>]*/>', $logoSvg
    $content = $content -replace '<img alt="Bald & Bold Logo"[^>]*src="https://lh3\.googleusercontent\.com/aida/[^"]*"[^>]*/>', $logoSvg
    
    # 2. Заменить логотип с invert (для футера)
    $content = $content -replace '<img alt="Bald &amp; Bold Logo" class="[^"]*invert[^"]*"[^>]*src="https://lh3\.googleusercontent\.com/aida/[^"]*"[^>]*/>', $logoSvgInvert
    
    # 3. Заменить цены
    foreach ($key in $priceMap.Keys) {
        $content = $content -replace [regex]::Escape($key), $priceMap[$key]
    }
    
    # 4. Обновить навигацию - заменить href="#" на реальные пути
    # Логотип
    $content = $content -replace '(<a class="[^"]*flex items-center gap-3[^"]*"[^>]*)href="#"', '$1href="../bald_bold_1/code.html"'
    
    # Каталог, Новинки, О нас, Доставка в nav
    $content = $content -replace '(<a[^>]*>Каталог</a>)' -replace 'href="#"', 'href="../bald_bold_2/code.html"'
    $content = $content -replace '(<a[^>]*>Новинки</a>)' -replace 'href="#"', 'href="../bald_bold_2/code.html"'
    $content = $content -replace '(<a[^>]*>О нас</a>)' -replace 'href="#"', 'href="../bald_bold_1/code.html"'
    $content = $content -replace '(<a[^>]*>Доставка</a>)' -replace 'href="#"', 'href="../bald_bold_1/code.html"'
    
    # Профиль и корзина
    $content = $content -replace '(<[^>]*aria-label="Профиль"[^>]*)href="#"', '$1href="../bald_bold_5/code.html"'
    $content = $content -replace '(<[^>]*aria-label="Личный кабинет"[^>]*)href="#"', '$1href="../bald_bold_5/code.html"'
    $content = $content -replace '(<[^>]*aria-label="Корзина"[^>]*)href="#"', '$1href="../bald_bold_4/code.html"'
    $content = $content -replace '(<[^>]*shopping_bag[^>]*</span>\s*</[^>]*>)' -replace '<button', '<a' -replace '</button>', '</a>'
    
    # Хлебные крошки
    $content = $content -replace '(<a[^>]*>Главная</a>)' -replace 'href="#"', 'href="../bald_bold_1/code.html"'
    
    # Кнопка "Смотреть каталог"
    $content = $content -replace 'href="#catalog"', 'href="../bald_bold_2/code.html"'
    
    # Сохранить файл
    [System.IO.File]::WriteAllText($file, $content, [System.Text.UTF8Encoding]::new($false))
    
    Write-Host "Файл обновлён: $file"
}

Write-Host "Готово! Все файлы обновлены."
