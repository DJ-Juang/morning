document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const canvas = document.getElementById('quote-canvas');
    const ctx = canvas.getContext('2d');

    // 點擊生成按鈕
    generateBtn.addEventListener('click', generateMorningImage);

    // 點擊下載按鈕
    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = `早安_${new Date().toISOString().slice(0,10)}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });

    function generateMorningImage() {
        // 1. 清空畫布並填入高級感素色背景 (模擬留白意境)
        ctx.fillStyle = '#f7f6f3'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. 獲取日期資料
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const date = String(now.getDate()).padStart(2, '0');
        
        const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        const dayOfWeek = weekDays[now.getDay()];

        // 透過導入的 lunar-javascript 獲取精確農曆
        const lunar = Lunar.fromDate(now);
        const lunarMonth = lunar.getMonthInChinese();
        const lunarDay = lunar.getDayInChinese();
        const lunarText = `農曆 ${lunarMonth}月${lunarDay}`;

        // 3. 獲取使用者選取的視覺元素組合（意象化呈現）
        const mainEl = document.getElementById('custom-main').value || document.getElementById('main-element').value;
        const animalEl = document.getElementById('custom-animal').value || document.getElementById('animal-element').value;
        const styleEl = document.getElementById('style-element').value;
        const accEl = document.getElementById('custom-accessory').value || document.getElementById('accessory-element').value;

        // 4. 繪製藝術文字背景或意象裝飾 (符合高級、克制、不浮誇風格)
        // 在中央偏上繪製一個極淡、優雅的幾何裝飾框，營造空間感
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.lineWidth = 1;
        ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

        // 5. 繪製視覺元素文字標籤 (用極微小的字體縮在角落，呈現日系/歐風雜誌的進階層次感)
        ctx.fillStyle = '#8e8e8c';
        ctx.font = 'italic 14px "Times New Roman", "Microsoft JhengHei"';
        ctx.textAlign = 'left';
        let elementScene = `Scene: ${styleEl} / ${mainEl}`;
        if (animalEl !== '無') elementScene += ` / ${animalEl}`;
        if (accEl !== '無') elementScene += ` / ${accEl}`;
        ctx.fillText(elementScene, 90, canvas.height - 90);

        // 6. 繪製日期與星期元素 (主視覺焦點之一，置中偏上)
        ctx.textAlign = 'center';
        
        // 大西曆日期
        ctx.fillStyle = '#1a1a1a';
        ctx.font = '100 80px "Helvetica Neue", Arial';
        ctx.fillText(`${month} . ${date}`, canvas.width / 2, 220);

        // 星期與農曆 (小字)
        ctx.fillStyle = '#666666';
        ctx.font = '300 18px "Microsoft JhengHei"';
        ctx.letterSpacing = '4px'; // 增加字距顯得高級
        ctx.fillText(`${dayOfWeek}  ·  ${lunarText}`, canvas.width / 2, 275);
        ctx.letterSpacing = '0px'; // 重設字距

        // 劃一條精細的分割線
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 - 40, 320);
        ctx.lineTo(canvas.width / 2 + 40, 320);
        ctx.stroke();

        // 7. 繪製勵志文字 (置中排版，行距留白寬鬆)
        const quoteText = document.getElementById('quote-input').value;
        // 依據換行或分號拆分句子
        const lines = quoteText.split(/[\n;\uff1b]/).filter(line => line.trim() !== '');
        
        ctx.fillStyle = '#2c2c2c';
        ctx.font = '300 24px "Microsoft JhengHei"';
        
        let startY = 440; // 文字起始高度
        const lineHeight = 48; // 寬鬆行高

        lines.slice(0, 4).forEach((line) => { // 限制最多4句
            ctx.fillText(line.trim(), canvas.width / 2, startY);
            startY += lineHeight;
        });

        // 8. 底部留白點綴 - "GOOD MORNING" 藝術字
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.font = 'italic 20px "Times New Roman"';
        ctx.letterSpacing = '6px';
        ctx.fillText('G O O D  M O R N I N G', canvas.width / 2, canvas.height - 150);
        ctx.letterSpacing = '0px';

        // 啟用下載按鈕
        downloadBtn.disabled = false;
    }
});
