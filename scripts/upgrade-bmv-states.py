#!/usr/bin/env python3
"""
Upgrade all state BMV pages to 5-tab structure matching Indiana standard.
Adds: Từ Vựng (Vocabulary) tab + Biển Báo (Signs) tab.
Enhances: Luật (Rules) tab with comprehensive state-specific data.

Run from project root: python scripts/upgrade-bmv-states.py
"""

import re, os, sys

# ─── STATE DATA ───────────────────────────────────────────────────────────────

STATES = {
    "al": {
        "name": "Alabama", "abbr": "AL",
        "agency": "ALEA", "website": "alea.gov",
        "questions": 40, "pass_num": 32, "pass_pct": 80, "fee": "$36",
        "speed_res": 25, "speed_school": 20, "speed_rural": 55, "speed_hwy": 70,
        "dui_adult": "≥0.08%", "dui_under21": "≥0.02%", "dui_cdl": "≥0.04%",
        "helmet": "BẮT BUỘC cho TẤT CẢ (bất kể tuổi) — luật nghiêm nhất",
        "phone": "Cấm texting khi lái (từ 2012) — phạt $25 lần đầu",
        "signal_ft": "100 feet (khoảng 30m)",
        "follow": "2 giây tối thiểu (thêm khoảng cách khi trời mưa)",
        "insurance": "$25,000/$50,000 thương tích / $25,000 tài sản",
        "extras": [
            ("Move Over Law", "Chuyển làn hoặc giảm tốc đáng kể khi qua xe cứu thương đứng bên lề"),
            ("Xe buýt trường học", "Dừng HOÀN TOÀN cả 2 chiều khi đèn đỏ nhấp nháy — dù có dải phân cách"),
            ("Khu trường học", "20 mph khi có đèn nhấp nháy hoặc trẻ em hiện diện"),
            ("Right on red", "Được rẽ phải khi đèn đỏ sau khi dừng hoàn toàn, trừ khi có biển cấm"),
        ]
    },
    "ar": {
        "name": "Arkansas", "abbr": "AR",
        "agency": "DFA Revenue", "website": "dfa.arkansas.gov",
        "questions": 25, "pass_num": 20, "pass_pct": 80, "fee": "$14",
        "speed_res": 30, "speed_school": 15, "speed_rural": 65, "speed_hwy": 70,
        "dui_adult": "≥0.08%", "dui_under21": "≥0.02%", "dui_cdl": "≥0.04%",
        "helmet": "BẮT BUỘC dưới 21 tuổi và người chở đằng sau",
        "phone": "Cấm texting khi lái — phạt lên đến $250",
        "signal_ft": "100 feet (khoảng 30m)",
        "follow": "3 giây tối thiểu",
        "insurance": "$25,000/$50,000 thương tích / $25,000 tài sản",
        "extras": [
            ("Rẽ phải khi đèn đỏ", "Được phép sau khi dừng hoàn toàn, trừ khi có biển cấm"),
            ("Xe buýt trường học", "Dừng cả 2 chiều khi đèn nhấp nháy — trừ khi có dải phân cách"),
            ("Implied consent", "Đồng ý kiểm tra cồn khi xin bằng lái Arkansas"),
            ("Move Over Law", "Chuyển làn hoặc giảm tốc khi qua xe cứu thương bên lề"),
        ]
    },
    "az": {
        "name": "Arizona", "abbr": "AZ",
        "agency": "ADOT MVD", "website": "azdot.gov",
        "questions": 30, "pass_num": 24, "pass_pct": 80, "fee": "$15",
        "speed_res": 25, "speed_school": 15, "speed_rural": 65, "speed_hwy": 75,
        "dui_adult": "≥0.08%", "dui_under21": "0.00% (zero tolerance)", "dui_cdl": "≥0.04%",
        "helmet": "BẮT BUỘC dưới 18 tuổi",
        "phone": "Cấm cầm điện thoại khi lái (từ 7/2021) — phạt $135–$235",
        "signal_ft": "100 feet (khoảng 30m)",
        "follow": "2 giây tối thiểu (nhiều hơn khi trời nắng gắt/mưa sa mạc)",
        "insurance": "$25,000/$50,000 thương tích / $15,000 tài sản",
        "extras": [
            ("Interstate 75 mph", "Một trong những giới hạn tốc độ cao nhất vùng Southwest"),
            ("Flash flood — Stupid Motorist Law", "Cấm vượt qua đường ngập — có thể bị phạt/buộc trả phí cứu hộ"),
            ("Extreme heat", "Tuyệt đối không để trẻ em/thú cưng trong xe khi trời nóng"),
            ("Xe buýt trường học", "Dừng cả 2 chiều khi đèn nhấp nháy"),
        ]
    },
    "fl": {
        "name": "Florida", "abbr": "FL",
        "agency": "FLHSMV / DHSMV", "website": "flhsmv.gov",
        "questions": 50, "pass_num": 40, "pass_pct": 80, "fee": "$48 (tổng)",
        "speed_res": 30, "speed_school": 20, "speed_rural": 65, "speed_hwy": 70,
        "dui_adult": "≥0.08%", "dui_under21": "≥0.02%", "dui_cdl": "≥0.04%",
        "helmet": "BẮT BUỘC dưới 21 tuổi · Trên 21 có thể miễn nếu có bảo hiểm ≥$10,000",
        "phone": "Cấm cầm tay khi lái (kể cả dừng đèn đỏ) — tuyệt đối cấm trong school/work zone",
        "signal_ft": "100 feet (khoảng 30m)",
        "follow": "2 giây (3 giây cho xe tải lớn)",
        "insurance": "$10,000 PIP + $10,000 PDL (Florida là no-fault state)",
        "extras": [
            ("No-fault state", "FL là tiểu bang 'no-fault' — dùng bảo hiểm PIP của mình trước"),
            ("Move Over Law", "Chuyển làn hoặc giảm 20 mph dưới giới hạn khi qua xe dừng bên lề"),
            ("Implied consent", "Từ chối test cồn = bị thu bằng 1 năm ngay lập tức"),
            ("Xe buýt trường học", "Dừng cả 2 chiều khi đèn nhấp nháy — phạt $200–$400"),
        ]
    },
    "ga": {
        "name": "Georgia", "abbr": "GA",
        "agency": "DDS", "website": "dds.georgia.gov",
        "questions": 40, "pass_num": 30, "pass_pct": 75, "fee": "$10",
        "speed_res": 30, "speed_school": 15, "speed_rural": 65, "speed_hwy": 70,
        "dui_adult": "≥0.08%", "dui_under21": "≥0.02%", "dui_cdl": "≥0.04%",
        "helmet": "BẮT BUỘC dưới 18 tuổi và người ngồi sau",
        "phone": "Cấm cầm điện thoại khi lái (Hands-Free Georgia Act 2018) — phạt $50–$150",
        "signal_ft": "100 feet (khoảng 30m)",
        "follow": "2 giây tối thiểu",
        "insurance": "$25,000/$50,000 thương tích / $25,000 tài sản",
        "extras": [
            ("Hands-Free Georgia Act", "TUYỆT ĐỐI không cầm điện thoại — phải dùng Bluetooth/speaker/mount"),
            ("Scott's Law / Move Over", "Phạt nặng khi không nhường đường cho xe khẩn cấp — tái phạm = tù"),
            ("Super Speeder Law", "Phạt thêm $200 nếu chạy ≥75 mph trên 2-lane hoặc ≥85 mph bất kỳ đường nào"),
            ("Xe buýt trường học", "Dừng cả 2 chiều khi đèn nhấp nháy — phạt $300 lần đầu"),
        ]
    },
    "la": {
        "name": "Louisiana", "abbr": "LA",
        "agency": "OMV", "website": "expresslane.org",
        "questions": 40, "pass_num": 32, "pass_pct": 80, "fee": "$27.50",
        "speed_res": 25, "speed_school": 20, "speed_rural": 65, "speed_hwy": 70,
        "dui_adult": "≥0.08%", "dui_under21": "≥0.02%", "dui_cdl": "≥0.04%",
        "helmet": "BẮT BUỘC cho TẤT CẢ (bất kể tuổi) — như Alabama",
        "phone": "Cấm texting khi lái — phạt $175 lần đầu, $500 lần 3+",
        "signal_ft": "100 feet (khoảng 30m)",
        "follow": "2 giây tối thiểu",
        "insurance": "$15,000/$30,000 thương tích / $25,000 tài sản",
        "extras": [
            ("Implied consent", "Từ chối test cồn = mất bằng 1 năm tự động"),
            ("Hurricane evacuation routes", "Biết lộ trình di tản khẩn cấp — bắt buộc theo luật"),
            ("Mũ bảo hiểm", "Bắt buộc cho TẤT CẢ người đi xe máy — không ngoại lệ"),
            ("Move Over Law", "Chuyển làn khi qua xe cứu thương/bảo dưỡng đứng bên lề"),
        ]
    },
    "mn": {
        "name": "Minnesota", "abbr": "MN",
        "agency": "DVS", "website": "dvs.dps.mn.gov",
        "questions": 40, "pass_num": 32, "pass_pct": 80, "fee": "$20",
        "speed_res": 30, "speed_school": 20, "speed_rural": 55, "speed_hwy": 70,
        "dui_adult": "≥0.08%", "dui_under21": "0.00% (zero tolerance)", "dui_cdl": "≥0.04%",
        "helmet": "BẮT BUỘC dưới 18 tuổi",
        "phone": "Cấm texting khi lái — phạt $50–$275",
        "signal_ft": "100 feet (khoảng 30m)",
        "follow": "3 giây tối thiểu (6+ giây khi đường đóng băng)",
        "insurance": "$30,000/$60,000 thương tích / $10,000 tài sản",
        "extras": [
            ("Lái xe mùa đông", "Giảm 1/3 tốc độ khi đường ướt, giảm 1/2 khi băng/tuyết dày"),
            ("Move Over Law", "Bắt buộc chuyển làn khi qua xe khẩn cấp đứng bên lề"),
            ("Zero tolerance dưới 21", "Bất kỳ lượng cồn nào = DUI cho người dưới 21 tuổi"),
            ("Black ice", "Băng vô hình (black ice) rất nguy hiểm — luôn chạy chậm sáng sớm"),
        ]
    },
    "ms": {
        "name": "Mississippi", "abbr": "MS",
        "agency": "DPS", "website": "dps.ms.gov",
        "questions": 30, "pass_num": 24, "pass_pct": 80, "fee": "$25",
        "speed_res": 25, "speed_school": 15, "speed_rural": 65, "speed_hwy": 70,
        "dui_adult": "≥0.08%", "dui_under21": "≥0.02%", "dui_cdl": "≥0.04%",
        "helmet": "BẮT BUỘC dưới 18 tuổi",
        "phone": "Cấm texting khi lái — phạt $25–$100",
        "signal_ft": "100 feet (khoảng 30m)",
        "follow": "2 giây tối thiểu",
        "insurance": "$25,000/$50,000 thương tích / $25,000 tài sản",
        "extras": [
            ("Implied consent", "Đồng ý kiểm tra cồn máu khi nhận bằng lái Mississippi"),
            ("Seat belt", "BẮT BUỘC cho lái xe và hành khách phía trước — phạt $25"),
            ("Xe buýt trường học", "Dừng hoàn toàn cả 2 chiều khi đèn nhấp nháy"),
            ("Move Over Law", "Chuyển làn khi qua xe cứu thương đứng bên lề đường"),
        ]
    },
    "mt": {
        "name": "Montana", "abbr": "MT",
        "agency": "MVSD", "website": "doj.mt.gov",
        "questions": 33, "pass_num": 25, "pass_pct": 76, "fee": "$25",
        "speed_res": 25, "speed_school": 15, "speed_rural": 70, "speed_hwy": 80,
        "dui_adult": "≥0.08%", "dui_under21": "≥0.02%", "dui_cdl": "≥0.04%",
        "helmet": "BẮT BUỘC dưới 18 tuổi",
        "phone": "Cấm texting khi lái — phạt $100–$200",
        "signal_ft": "100 feet (khoảng 30m)",
        "follow": "2 giây tối thiểu (4–6 giây khi có tuyết/băng)",
        "insurance": "$25,000/$50,000 thương tích / $20,000 tài sản",
        "extras": [
            ("Interstate 80 mph", "Montana có một số đường interstate 80 mph — cao nhất lower 48"),
            ("Open range law", "Gia súc (bò/ngựa) có thể xuất hiện tự do trên đường — tài xế phải tránh"),
            ("Wildlife crossing", "Hươu nai thường ra đường ban đêm — chạy chậm và chú ý biển báo"),
            ("Winter driving", "Tuyết rất nhiều — cần lốp winter hoặc chains khi cần thiết"),
        ]
    },
    "nc": {
        "name": "North Carolina", "abbr": "NC",
        "agency": "NCDMV", "website": "ncdot.gov",
        "questions": 25, "pass_num": 20, "pass_pct": 80, "fee": "$20",
        "speed_res": 35, "speed_school": 25, "speed_rural": 55, "speed_hwy": 70,
        "dui_adult": "≥0.08%", "dui_under21": "0.00% (bất kỳ lượng nào)", "dui_cdl": "≥0.04%",
        "helmet": "BẮT BUỘC cho TẤT CẢ (bất kể tuổi)",
        "phone": "Cấm texting khi lái — lần đầu phạt $100",
        "signal_ft": "100 feet (khoảng 30m)",
        "follow": "2 giây tối thiểu",
        "insurance": "$30,000/$60,000 thương tích / $25,000 tài sản",
        "extras": [
            ("Mũ bảo hiểm xe máy", "Bắt buộc cho TẤT CẢ người đi xe máy — bất kể tuổi"),
            ("Move Over Law", "Chuyển làn khi qua xe cứu thương, cảnh sát, xe bảo dưỡng bên lề"),
            ("Zero tolerance dưới 21", "BAC ≥0.01% = DWI cho người dưới 21 tuổi"),
            ("School zone 25 mph", "Phạt tối thiểu $250 nếu vi phạm giới hạn tốc độ trường học"),
        ]
    },
    "nv": {
        "name": "Nevada", "abbr": "NV",
        "agency": "DMV", "website": "dmvnv.com",
        "questions": 50, "pass_num": 40, "pass_pct": 80, "fee": "$26",
        "speed_res": 25, "speed_school": 15, "speed_rural": 70, "speed_hwy": 75,
        "dui_adult": "≥0.08%", "dui_under21": "≥0.02%", "dui_cdl": "≥0.04%",
        "helmet": "BẮT BUỘC dưới 18 tuổi",
        "phone": "Cấm cầm điện thoại khi lái — phạt $50–$250",
        "signal_ft": "100 feet (khoảng 30m)",
        "follow": "2 giây tối thiểu",
        "insurance": "$25,000/$50,000 thương tích / $20,000 tài sản",
        "extras": [
            ("Open container", "Cấm uống rượu bia TRONG XE khi lái — Nevada phạt nặng"),
            ("Basic Speed Law", "Phải lái tốc độ AN TOÀN cho điều kiện, dù thấp hơn giới hạn"),
            ("Las Vegas Strip", "Người đi bộ có quyền ưu tiên — dừng hoàn toàn tại crosswalk"),
            ("Desert driving", "Kiểm tra nước làm mát và lốp xe khi lái đường dài sa mạc"),
        ]
    },
    "oh": {
        "name": "Ohio", "abbr": "OH",
        "agency": "BMV", "website": "bmv.ohio.gov",
        "questions": 40, "pass_num": 30, "pass_pct": 75, "fee": "$26",
        "speed_res": 25, "speed_school": 20, "speed_rural": 55, "speed_hwy": 70,
        "dui_adult": "≥0.08%", "dui_under21": "≥0.02%", "dui_cdl": "≥0.04%",
        "helmet": "BẮT BUỘC dưới 18 tuổi",
        "phone": "Cấm cầm điện thoại khi lái (Distracted Driving Law, 4/2023) — phạt $150 lần đầu",
        "signal_ft": "100 feet (khoảng 30m)",
        "follow": "2 giây tối thiểu",
        "insurance": "$25,000/$50,000 thương tích / $25,000 tài sản",
        "extras": [
            ("Distracted Driving Law 2023", "Phạt $150 lần đầu; $250 lần 2; $500 lần 3 — không phân biệt di động/GPS"),
            ("Move Over Law", "Bắt buộc chuyển làn khi qua xe cứu thương đứng bên lề"),
            ("Seat belt", "BẮT BUỘC tất cả hành khách — phạt $30 lần đầu"),
            ("Rẽ phải khi đèn đỏ", "Được phép sau khi dừng hoàn toàn, trừ khi có biển cấm"),
        ]
    },
    "pa": {
        "name": "Pennsylvania", "abbr": "PA",
        "agency": "PennDOT", "website": "dmv.pa.gov",
        "questions": 18, "pass_num": 15, "pass_pct": 83, "fee": "$35.50",
        "speed_res": 25, "speed_school": 15, "speed_rural": 55, "speed_hwy": 65,
        "dui_adult": "≥0.08%", "dui_under21": "≥0.02%", "dui_cdl": "≥0.04%",
        "helmet": "BẮT BUỘC dưới 21 tuổi và người mới có bằng",
        "phone": "Cấm texting khi lái — phạt $50",
        "signal_ft": "100 feet (khoảng 30m)",
        "follow": "2 giây tối thiểu",
        "insurance": "$15,000/$30,000 thương tích / $5,000 tài sản (thấp nhất — mua thêm được)",
        "extras": [
            ("3-tier DUI system", "0.08–0.099% = General; 0.10–0.159% = High; ≥0.16% = Highest BAC"),
            ("Move Over Law", "Bắt buộc chuyển làn khi qua xe cứu thương đứng bên lề"),
            ("Xe buýt trường học", "Dừng cả 2 chiều khi đèn nhấp nháy, trừ đường có dải phân cách"),
            ("Turnpike", "Đường Turnpike PA yêu cầu trả phí — chuẩn bị tiền lẻ hoặc EZPass"),
        ]
    },
    "sc": {
        "name": "South Carolina", "abbr": "SC",
        "agency": "SCDMV", "website": "scdmvonline.com",
        "questions": 30, "pass_num": 23, "pass_pct": 77, "fee": "$25",
        "speed_res": 30, "speed_school": 15, "speed_rural": 55, "speed_hwy": 70,
        "dui_adult": "≥0.08%", "dui_under21": "≥0.02%", "dui_cdl": "≥0.04%",
        "helmet": "BẮT BUỘC dưới 21 tuổi",
        "phone": "Cấm texting khi lái — phạt $25 lần đầu",
        "signal_ft": "100 feet (khoảng 30m)",
        "follow": "2 giây tối thiểu",
        "insurance": "$25,000/$50,000 thương tích / $25,000 tài sản",
        "extras": [
            ("Implied consent", "Đồng ý kiểm tra cồn khi nhận bằng lái South Carolina"),
            ("Open container", "Cấm uống rượu bia trong tầm với của tài xế — phạt $100–$200"),
            ("Seat belt", "BẮT BUỘC tất cả hành khách kể cả ghế sau — phạt $25"),
            ("Move Over Law", "Chuyển làn khi qua xe cứu thương/cảnh sát đứng bên lề"),
        ]
    },
    "sd": {
        "name": "South Dakota", "abbr": "SD",
        "agency": "Driver Licensing", "website": "sd.gov/driver",
        "questions": 25, "pass_num": 20, "pass_pct": 80, "fee": "$20",
        "speed_res": 25, "speed_school": 15, "speed_rural": 65, "speed_hwy": 80,
        "dui_adult": "≥0.08%", "dui_under21": "≥0.02%", "dui_cdl": "≥0.04%",
        "helmet": "BẮT BUỘC dưới 18 tuổi",
        "phone": "Cấm texting khi lái — phạt $100+",
        "signal_ft": "100 feet (khoảng 30m)",
        "follow": "2 giây tối thiểu (tăng lên 6+ giây khi tuyết/băng)",
        "insurance": "$25,000/$50,000 thương tích / $25,000 tài sản",
        "extras": [
            ("Interstate 80 mph", "South Dakota có giới hạn 80 mph trên interstate — một trong cao nhất nước"),
            ("Wildlife hazard", "Hươu/bò/ngựa thường xuất hiện trên đường nông thôn — chú ý biển"),
            ("Blizzard driving", "SD thường xuyên có bão tuyết — có thể bị kẹt; giữ xe đủ xăng/đồ ấm"),
            ("Open range", "Gia súc tự do đi lại — tài xế chịu trách nhiệm nếu đâm vào gia súc"),
        ]
    },
    "tx": {
        "name": "Texas", "abbr": "TX",
        "agency": "DPS", "website": "dps.texas.gov",
        "questions": 30, "pass_num": 21, "pass_pct": 70, "fee": "$16 + $33 license",
        "speed_res": 30, "speed_school": 20, "speed_rural": 70, "speed_hwy": 75,
        "dui_adult": "≥0.08%", "dui_under21": "0.00% (bất kỳ lượng nào)", "dui_cdl": "≥0.04%",
        "helmet": "BẮT BUỘC dưới 21 tuổi (trừ có hoàn thành khóa an toàn + bảo hiểm)",
        "phone": "Cấm texting khi lái — phạt $25–$99; $200 nếu gây tai nạn",
        "signal_ft": "100 feet (khoảng 30m)",
        "follow": "2 giây tối thiểu",
        "insurance": "$30,000/$60,000 thương tích / $25,000 tài sản",
        "extras": [
            ("Toll 130 — 85 mph", "Giới hạn tốc độ cao nhất Hoa Kỳ — Toll 130 (Austin) = 85 mph"),
            ("Move Over Law", "Bắt buộc chuyển làn khi qua xe cứu thương đứng bên lề — phạt nặng"),
            ("Zero tolerance dưới 21", "Bất kỳ lượng cồn nào = DWI — Texas không có 'một ly bia'"),
            ("Hỗ trợ tiếng Việt", "Nhiều văn phòng DPS tại Houston/Dallas có nhân viên nói tiếng Việt"),
        ]
    },
    "wi": {
        "name": "Wisconsin", "abbr": "WI",
        "agency": "DMV", "website": "wisconsindmv.gov",
        "questions": 50, "pass_num": 40, "pass_pct": 80, "fee": "$24",
        "speed_res": 25, "speed_school": 15, "speed_rural": 55, "speed_hwy": 70,
        "dui_adult": "≥0.08%", "dui_under21": "0.00% (zero tolerance GDL)", "dui_cdl": "≥0.04%",
        "helmet": "BẮT BUỘC dưới 18 tuổi",
        "phone": "Cấm texting khi lái — phạt $400 lần đầu",
        "signal_ft": "100 feet (khoảng 30m)",
        "follow": "3 giây tối thiểu (6+ giây khi đường đóng băng)",
        "insurance": "$25,000/$50,000 thương tích / $10,000 tài sản",
        "extras": [
            ("Move Over Law", "Chuyển làn khi qua xe khẩn cấp, bảo dưỡng, xe nông nghiệp bên lề"),
            ("Lái xe mùa đông", "WI rất nhiều tuyết — giảm 50% tốc độ khi đường đóng băng"),
            ("Zero tolerance GDL", "Người mới có bằng dưới 21 tuổi: BAC 0.00% — không được uống gì"),
            ("Deer season", "Mùa thu/đông: hươu nai thường vượt đường — chú ý biển và chạy chậm"),
        ]
    },
}

# ─── SHARED VOCABULARY HTML ──────────────────────────────────────────────────

VOCAB_CSS = """
/* ─── Vocabulary tables ─── */
.vtopic-tabs{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px}
.vtopic-btn{padding:6px 14px;border-radius:20px;font-size:11.5px;font-weight:500;border:1px solid #2d3f55;background:#1a2535;color:#64748b;cursor:pointer;transition:all .12s}
.vtopic-btn.active{background:#1d4ed8;border-color:#1d4ed8;color:#fff}
.vtopic-pane{display:none}.vtopic-pane.active{display:block}
.vt{width:100%;border-collapse:collapse;font-size:12.5px;background:#1a2535;border-radius:8px;overflow:hidden;margin-bottom:14px}
.vt th{background:#0f2a47;color:#93c5fd;padding:8px 10px;text-align:left;font-size:11.5px;font-weight:600}
.vt td{padding:7px 10px;border-bottom:1px solid #1e2d3d;vertical-align:top;line-height:1.6}
.vt tr:nth-child(even) td{background:#1e2d3d}
.ven{color:#e2e8f0;font-weight:500}
.vvi{color:#94a3b8;font-style:italic}
.vex{color:#60a5fa;font-size:12px}
.vimp{color:#f59e0b;font-size:11px;font-weight:600}
/* ─── Signs grid ─── */
.signs-cat{background:#1a2535;border:1px solid #2d3f55;border-radius:10px;padding:14px 16px;margin-bottom:14px}
.signs-cat h3{font-size:13px;font-weight:700;margin-bottom:12px}
.signs-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px}
.sign-card{background:#0f1923;border:1px solid #2d3f55;border-radius:8px;padding:10px 12px;display:flex;gap:10px;align-items:flex-start}
.sign-icon{font-size:24px;flex-shrink:0;width:36px;text-align:center}
.sign-info .sign-name{font-size:12.5px;font-weight:600;color:#e2e8f0}
.sign-info .sign-vi{font-size:12px;color:#94a3b8;font-style:italic}
.sign-info .sign-note{font-size:11.5px;color:#60a5fa;margin-top:3px}
"""

def vocab_html():
    return """<div id="v" class="tab-pane">
  <div class="info-box"><h3>📖 Từ Vựng Giao Thông Song Ngữ</h3>
    <p style="font-size:12px;color:#64748b;margin-bottom:0">Chọn chủ đề để xem từ vựng quan trọng</p>
  </div>
  <div class="vtopic-tabs">
    <button class="vtopic-btn active" onclick="svt('vt1',this)">🚗 Xe &amp; Lái</button>
    <button class="vtopic-btn" onclick="svt('vt2',this)">💡 Đèn &amp; Biển</button>
    <button class="vtopic-btn" onclick="svt('vt3',this)">⚖️ Luật &amp; Phạt</button>
    <button class="vtopic-btn" onclick="svt('vt4',this)">🛣️ Đường &amp; Làn</button>
    <button class="vtopic-btn" onclick="svt('vt5',this)">🏛️ DMV &amp; Giấy tờ</button>
  </div>

  <div id="vt1" class="vtopic-pane active">
    <table class="vt">
      <tr><th>English</th><th>Tiếng Việt</th><th>Ghi chú</th></tr>
      <tr><td class="ven">Steering wheel</td><td class="vvi">Vô lăng</td><td class="vex"></td></tr>
      <tr><td class="ven">Accelerator / Gas pedal <span class="vimp">⚡HAY THI</span></td><td class="vvi">Chân ga</td><td class="vex">Đạp để tăng tốc</td></tr>
      <tr><td class="ven">Brake pedal <span class="vimp">⚡HAY THI</span></td><td class="vvi">Bàn đạp phanh / chân thắng</td><td class="vex">Đạp để giảm tốc và dừng</td></tr>
      <tr><td class="ven">Clutch</td><td class="vvi">Ly hợp (số tay)</td><td class="vex">Chỉ có ở xe số tay</td></tr>
      <tr><td class="ven">Gear shift / Shifter</td><td class="vvi">Cần số</td><td class="vex">P=Đỗ, R=Lùi, N=Số 0, D=Tiến</td></tr>
      <tr><td class="ven">Rearview mirror <span class="vimp">⚡HAY THI</span></td><td class="vvi">Gương chiếu hậu (trong)</td><td class="vex">Xem phía sau từ trong xe</td></tr>
      <tr><td class="ven">Side mirror</td><td class="vvi">Gương bên (ngoài)</td><td class="vex">Kiểm tra trước khi đổi làn</td></tr>
      <tr><td class="ven">Turn signal / Blinker <span class="vimp">⚡HAY THI</span></td><td class="vvi">Đèn xi nhan</td><td class="vex">Bật trước khi rẽ ≥100 feet</td></tr>
      <tr><td class="ven">Hazard lights / Flashers</td><td class="vvi">Đèn khẩn cấp (4 đèn nháy)</td><td class="vex">Dùng khi xe dừng khẩn cấp</td></tr>
      <tr><td class="ven">Windshield</td><td class="vvi">Kính chắn gió</td><td class="vex">Phải sạch và không có vết nứt</td></tr>
      <tr><td class="ven">Wiper</td><td class="vvi">Cần gạt nước (gạt mưa)</td><td class="vex">Bật khi trời mưa</td></tr>
      <tr><td class="ven">Horn</td><td class="vvi">Còi xe</td><td class="vex">Dùng để cảnh báo, không dùng vô cớ</td></tr>
      <tr><td class="ven">Seat belt <span class="vimp">⚡HAY THI</span></td><td class="vvi">Dây an toàn</td><td class="vex">BẮT BUỘC khi xe đang chạy</td></tr>
      <tr><td class="ven">Airbag</td><td class="vvi">Túi khí</td><td class="vex">Tự bung khi có va chạm mạnh</td></tr>
      <tr><td class="ven">Dashboard</td><td class="vvi">Bảng điều khiển (tableau)</td><td class="vex">Nơi có các đồng hồ và đèn báo</td></tr>
      <tr><td class="ven">Speedometer <span class="vimp">⚡HAY THI</span></td><td class="vvi">Đồng hồ tốc độ</td><td class="vex">Hiển thị tốc độ hiện tại (mph)</td></tr>
      <tr><td class="ven">Fuel gauge</td><td class="vvi">Đồng hồ xăng</td><td class="vex">E=Empty (hết), F=Full (đầy)</td></tr>
      <tr><td class="ven">Check engine light</td><td class="vvi">Đèn báo động cơ</td><td class="vex">Phải đưa xe đi kiểm tra ngay</td></tr>
      <tr><td class="ven">Parking brake / Emergency brake</td><td class="vvi">Phanh tay / phanh khẩn cấp</td><td class="vex">Dùng khi đỗ xe dốc</td></tr>
      <tr><td class="ven">Odometer</td><td class="vvi">Đồng hồ số dặm</td><td class="vex">Tổng số dặm xe đã đi</td></tr>
      <tr><td class="ven">Transmission</td><td class="vvi">Hộp số</td><td class="vex">Automatic (tự động) / Manual (số tay)</td></tr>
    </table>
  </div>

  <div id="vt2" class="vtopic-pane">
    <table class="vt">
      <tr><th>English</th><th>Tiếng Việt</th><th>Ghi chú</th></tr>
      <tr><td class="ven">Headlights <span class="vimp">⚡HAY THI</span></td><td class="vvi">Đèn pha (đèn đầu xe)</td><td class="vex">Bật khi trời tối, mưa, sương mù</td></tr>
      <tr><td class="ven">High beams / Brights <span class="vimp">⚡HAY THI</span></td><td class="vvi">Đèn pha xa</td><td class="vex">Tắt khi có xe ngược chiều trong 500 feet</td></tr>
      <tr><td class="ven">Low beams / Dipped lights</td><td class="vvi">Đèn pha gần</td><td class="vex">Dùng trong thành phố và khi có xe ngược</td></tr>
      <tr><td class="ven">Tail lights</td><td class="vvi">Đèn hậu</td><td class="vex">Đỏ, bật cùng đèn pha</td></tr>
      <tr><td class="ven">Brake lights <span class="vimp">⚡HAY THI</span></td><td class="vvi">Đèn thắng (đèn phanh)</td><td class="vex">Sáng khi đạp phanh</td></tr>
      <tr><td class="ven">Traffic light / Signal <span class="vimp">⚡HAY THI</span></td><td class="vvi">Đèn giao thông</td><td class="vex">Xanh=đi, Vàng=chuẩn bị dừng, Đỏ=dừng</td></tr>
      <tr><td class="ven">Flashing red light</td><td class="vvi">Đèn đỏ nhấp nháy</td><td class="vex">Xử lý như biển STOP — dừng hoàn toàn</td></tr>
      <tr><td class="ven">Flashing yellow light</td><td class="vvi">Đèn vàng nhấp nháy</td><td class="vex">Cẩn thận và tiếp tục chậm</td></tr>
      <tr><td class="ven">Stop sign <span class="vimp">⚡HAY THI</span></td><td class="vvi">Biển DỪNG LẠI (STOP)</td><td class="vex">Đỏ, 8 cạnh — dừng hoàn toàn</td></tr>
      <tr><td class="ven">Yield sign <span class="vimp">⚡HAY THI</span></td><td class="vvi">Biển NHƯỜNG ĐƯỜNG (YIELD)</td><td class="vex">Tam giác đỏ đầu xuống</td></tr>
      <tr><td class="ven">Speed limit sign</td><td class="vvi">Biển giới hạn tốc độ</td><td class="vex">Trắng/đen — tốc độ tối đa</td></tr>
      <tr><td class="ven">No U-turn</td><td class="vvi">Cấm quay đầu xe</td><td class="vex">Chữ U gạch chéo</td></tr>
      <tr><td class="ven">Do Not Enter <span class="vimp">⚡HAY THI</span></td><td class="vvi">Cấm vào (đường ngược chiều)</td><td class="vex">Tròn đỏ với gạch ngang trắng</td></tr>
      <tr><td class="ven">Wrong Way</td><td class="vvi">Đi sai chiều</td><td class="vex">Thường đặt cùng biển Do Not Enter</td></tr>
      <tr><td class="ven">One Way</td><td class="vvi">Đường một chiều</td><td class="vex">Mũi tên đen trên nền trắng</td></tr>
      <tr><td class="ven">Pedestrian crossing / Crosswalk <span class="vimp">⚡HAY THI</span></td><td class="vvi">Lối sang đường người đi bộ</td><td class="vex">Hình người đi bộ vàng</td></tr>
      <tr><td class="ven">School zone sign <span class="vimp">⚡HAY THI</span></td><td class="vvi">Biển khu vực trường học</td><td class="vex">Vàng, hình học sinh — chạy chậm lại</td></tr>
      <tr><td class="ven">Railroad crossing (RxR)</td><td class="vvi">Đường giao cắt đường sắt</td><td class="vex">Chữ X vàng hoặc biển + cánh cổng</td></tr>
      <tr><td class="ven">Construction / Work zone</td><td class="vvi">Khu vực thi công</td><td class="vex">Cam — phạt gấp đôi khi vi phạm</td></tr>
      <tr><td class="ven">Advisory speed sign</td><td class="vvi">Biển tốc độ khuyến cáo</td><td class="vex">Vàng — khuyến cáo (không phải bắt buộc)</td></tr>
    </table>
  </div>

  <div id="vt3" class="vtopic-pane">
    <table class="vt">
      <tr><th>English</th><th>Tiếng Việt</th><th>Ghi chú</th></tr>
      <tr><td class="ven">DUI (Driving Under Influence) <span class="vimp">⚡HAY THI</span></td><td class="vvi">Lái xe khi say rượu/ma túy</td><td class="vex">DWI = Driving While Intoxicated (cùng nghĩa)</td></tr>
      <tr><td class="ven">BAC (Blood Alcohol Content) <span class="vimp">⚡HAY THI</span></td><td class="vvi">Nồng độ cồn trong máu</td><td class="vex">Giới hạn hợp pháp: 0.08% người lớn</td></tr>
      <tr><td class="ven">Breathalyzer</td><td class="vvi">Máy kiểm tra hơi thở</td><td class="vex">Cảnh sát dùng để kiểm tra cồn nhanh</td></tr>
      <tr><td class="ven">Field sobriety test</td><td class="vvi">Kiểm tra tỉnh táo tại chỗ</td><td class="vex">Đi thẳng, đứng một chân, mắt nhắm</td></tr>
      <tr><td class="ven">Implied consent <span class="vimp">⚡HAY THI</span></td><td class="vvi">Đồng ý ngầm</td><td class="vex">Xin bằng lái = đồng ý kiểm tra cồn khi cảnh sát yêu cầu</td></tr>
      <tr><td class="ven">Suspended license <span class="vimp">⚡HAY THI</span></td><td class="vvi">Bằng lái bị đình chỉ (tạm thu)</td><td class="vex">Tạm thời — có thể lấy lại sau</td></tr>
      <tr><td class="ven">Revoked license</td><td class="vvi">Bằng lái bị thu hồi hoàn toàn</td><td class="vex">Phải thi lại từ đầu để lấy lại</td></tr>
      <tr><td class="ven">Traffic ticket / Citation</td><td class="vvi">Giấy phạt vi phạm giao thông</td><td class="vex">Có thể trả tiền phạt hoặc ra tòa</td></tr>
      <tr><td class="ven">Fine</td><td class="vvi">Tiền phạt</td><td class="vex">Số tiền phải đóng vì vi phạm</td></tr>
      <tr><td class="ven">Points system</td><td class="vvi">Hệ thống điểm phạt</td><td class="vex">Tích đủ điểm = mất bằng lái</td></tr>
      <tr><td class="ven">Right of way <span class="vimp">⚡HAY THI</span></td><td class="vvi">Quyền ưu tiên đường</td><td class="vex">Ai có quyền đi trước tại ngã tư</td></tr>
      <tr><td class="ven">Reckless driving</td><td class="vvi">Lái xe liều lĩnh / nguy hiểm</td><td class="vex">Vi phạm hình sự — có thể bị bắt</td></tr>
      <tr><td class="ven">Negligent driving</td><td class="vvi">Lái xe bất cẩn</td><td class="vex">Nhẹ hơn reckless — vẫn bị phạt nặng</td></tr>
      <tr><td class="ven">Hit and run <span class="vimp">⚡HAY THI</span></td><td class="vvi">Bỏ chạy sau tai nạn</td><td class="vex">Tội hình sự nghiêm trọng — bị tù</td></tr>
      <tr><td class="ven">Road rage</td><td class="vvi">Nổi giận khi lái xe</td><td class="vex">Tránh khiêu khích người lái xe khác</td></tr>
      <tr><td class="ven">Move Over Law <span class="vimp">⚡HAY THI</span></td><td class="vvi">Luật nhường đường xe khẩn cấp</td><td class="vex">Chuyển làn hoặc giảm tốc khi xe cứu thương dừng bên lề</td></tr>
      <tr><td class="ven">School bus law <span class="vimp">⚡HAY THI</span></td><td class="vvi">Luật xe buýt trường học</td><td class="vex">Dừng khi đèn đỏ nhấp nháy — cả 2 chiều</td></tr>
      <tr><td class="ven">Failure to yield</td><td class="vvi">Không nhường đường</td><td class="vex">Vi phạm phổ biến tại ngã tư</td></tr>
      <tr><td class="ven">Running a red light</td><td class="vvi">Vượt đèn đỏ</td><td class="vex">Phạt nặng + điểm phạt</td></tr>
      <tr><td class="ven">Speeding</td><td class="vvi">Chạy quá tốc độ</td><td class="vex">Vượt giới hạn tốc độ</td></tr>
    </table>
  </div>

  <div id="vt4" class="vtopic-pane">
    <table class="vt">
      <tr><th>English</th><th>Tiếng Việt</th><th>Ghi chú</th></tr>
      <tr><td class="ven">Lane <span class="vimp">⚡HAY THI</span></td><td class="vvi">Làn xe</td><td class="vex">Mỗi làn có chiều rộng ~12 feet (3.6m)</td></tr>
      <tr><td class="ven">Merge <span class="vimp">⚡HAY THI</span></td><td class="vvi">Nhập làn / hợp lưu</td><td class="vex">Khi 2 làn thu thành 1 — nhường xe trong làn</td></tr>
      <tr><td class="ven">Lane change</td><td class="vvi">Đổi làn (chuyển làn)</td><td class="vex">Bật xi nhan, kiểm tra gương + điểm mù trước</td></tr>
      <tr><td class="ven">Blind spot <span class="vimp">⚡HAY THI</span></td><td class="vvi">Điểm mù</td><td class="vex">Vùng gương không thấy — quay đầu kiểm tra</td></tr>
      <tr><td class="ven">HOV lane (High Occupancy Vehicle)</td><td class="vvi">Làn xe nhiều người (carpool)</td><td class="vex">Thường cần ≥2 người trong xe</td></tr>
      <tr><td class="ven">Shoulder</td><td class="vvi">Lề đường (cứng)</td><td class="vex">Chỉ dừng khẩn cấp — không lái thường xuyên</td></tr>
      <tr><td class="ven">Median</td><td class="vvi">Dải phân cách giữa</td><td class="vex">Phần đường giữa 2 chiều ngược</td></tr>
      <tr><td class="ven">Curb</td><td class="vvi">Lề vỉa hè (bó vỉa)</td><td class="vex">Phần xi măng thấp ngăn xe và vỉa hè</td></tr>
      <tr><td class="ven">Intersection <span class="vimp">⚡HAY THI</span></td><td class="vvi">Ngã tư / giao lộ</td><td class="vex">Nơi hai đường giao nhau</td></tr>
      <tr><td class="ven">Roundabout / Traffic circle <span class="vimp">⚡HAY THI</span></td><td class="vvi">Vòng xuyến</td><td class="vex">Đi theo chiều kim đồng hồ — nhường xe trong vòng</td></tr>
      <tr><td class="ven">Crosswalk</td><td class="vvi">Vạch sang đường (lối đi bộ)</td><td class="vex">Nhường người đi bộ hoàn toàn</td></tr>
      <tr><td class="ven">Passing / Overtaking <span class="vimp">⚡HAY THI</span></td><td class="vvi">Vượt xe</td><td class="vex">Chỉ vượt bên trái trên đường thẳng cho phép</td></tr>
      <tr><td class="ven">No passing zone</td><td class="vvi">Khu vực cấm vượt xe</td><td class="vex">Vạch vàng liền = cấm vượt</td></tr>
      <tr><td class="ven">Interstate / Freeway <span class="vimp">⚡HAY THI</span></td><td class="vvi">Xa lộ liên bang</td><td class="vex">Đường cao tốc không có đèn giao thông</td></tr>
      <tr><td class="ven">Highway</td><td class="vvi">Đường cao tốc (state road)</td><td class="vex">Có thể có đèn và giao cắt</td></tr>
      <tr><td class="ven">On-ramp / Off-ramp</td><td class="vvi">Đường nối vào / ra cao tốc</td><td class="vex">Tăng/giảm tốc trước khi nhập/thoát</td></tr>
      <tr><td class="ven">Guardrail</td><td class="vvi">Dải bảo vệ bên đường</td><td class="vex">Ngăn xe lao khỏi đường</td></tr>
      <tr><td class="ven">Speed bump / Hump</td><td class="vvi">Gờ giảm tốc</td><td class="vex">Đi chậm — thường trong bãi đỗ và khu dân cư</td></tr>
      <tr><td class="ven">Centerline</td><td class="vvi">Vạch giữa đường (vạch trung tâm)</td><td class="vex">Vàng đứt = được vượt; vàng liền = cấm</td></tr>
      <tr><td class="ven">Fog line (edge line)</td><td class="vvi">Vạch trắng mép đường</td><td class="vex">Giới hạn bên phải của làn xe</td></tr>
      <tr><td class="ven">Dead end</td><td class="vvi">Đường cụt</td><td class="vex">Không có lối thoát — phải quay đầu</td></tr>
    </table>
  </div>

  <div id="vt5" class="vtopic-pane">
    <table class="vt">
      <tr><th>English</th><th>Tiếng Việt</th><th>Ghi chú</th></tr>
      <tr><td class="ven">Driver's license <span class="vimp">⚡HAY THI</span></td><td class="vvi">Bằng lái xe</td><td class="vex">Phải mang theo khi lái</td></tr>
      <tr><td class="ven">Learner's permit <span class="vimp">⚡HAY THI</span></td><td class="vvi">Giấy phép học lái xe</td><td class="vex">Cần người có bằng ngồi bên khi lái</td></tr>
      <tr><td class="ven">Knowledge test</td><td class="vvi">Thi lý thuyết (written test)</td><td class="vex">Thi trắc nghiệm để lấy learner's permit</td></tr>
      <tr><td class="ven">Road test / Driving test <span class="vimp">⚡HAY THI</span></td><td class="vvi">Thi thực hành lái xe</td><td class="vex">Kiểm tra viên ngồi trong xe đánh giá</td></tr>
      <tr><td class="ven">Vision test</td><td class="vvi">Kiểm tra thị lực</td><td class="vex">Thường làm tại DMV trước khi thi lý thuyết</td></tr>
      <tr><td class="ven">Vehicle registration <span class="vimp">⚡HAY THI</span></td><td class="vvi">Đăng ký xe</td><td class="vex">Phải gia hạn hàng năm</td></tr>
      <tr><td class="ven">Title (vehicle title)</td><td class="vvi">Giấy tờ sở hữu xe</td><td class="vex">Chứng minh ai là chủ xe</td></tr>
      <tr><td class="ven">License plate</td><td class="vvi">Biển số xe</td><td class="vex">Phải luôn sạch và đọc được</td></tr>
      <tr><td class="ven">Insurance / Car insurance <span class="vimp">⚡HAY THI</span></td><td class="vvi">Bảo hiểm xe</td><td class="vex">Bắt buộc ở tất cả các tiểu bang</td></tr>
      <tr><td class="ven">Liability insurance</td><td class="vvi">Bảo hiểm trách nhiệm dân sự</td><td class="vex">Trả tiền cho người khác nếu bạn gây tai nạn</td></tr>
      <tr><td class="ven">Proof of insurance <span class="vimp">⚡HAY THI</span></td><td class="vvi">Giấy chứng nhận bảo hiểm</td><td class="vex">Phải xuất trình khi cảnh sát yêu cầu</td></tr>
      <tr><td class="ven">SR-22</td><td class="vvi">Chứng nhận bảo hiểm đặc biệt</td><td class="vex">Yêu cầu sau DUI — bảo hiểm cao hơn</td></tr>
      <tr><td class="ven">Proof of residence</td><td class="vvi">Bằng chứng địa chỉ cư trú</td><td class="vex">Hóa đơn điện/nước, hợp đồng thuê nhà</td></tr>
      <tr><td class="ven">Real ID</td><td class="vvi">ID thực (Real ID Act)</td><td class="vex">Cần để lên máy bay trong nước từ 5/2025</td></tr>
      <tr><td class="ven">SSN (Social Security Number)</td><td class="vvi">Số an sinh xã hội</td><td class="vex">Thường cần khi xin bằng lái lần đầu</td></tr>
      <tr><td class="ven">ITIN</td><td class="vvi">Mã số thuế cá nhân</td><td class="vex">Một số tiểu bang chấp nhận thay SSN</td></tr>
      <tr><td class="ven">Renewal</td><td class="vvi">Gia hạn bằng lái</td><td class="vex">Thường 4–8 năm tùy tiểu bang</td></tr>
      <tr><td class="ven">DMV / BMV / MVA</td><td class="vvi">Sở xe cộ (Department/Bureau of Motor Vehicles)</td><td class="vex">Tên gọi khác nhau tùy tiểu bang</td></tr>
      <tr><td class="ven">Photo ID</td><td class="vvi">Chứng minh thư có ảnh</td><td class="vex">Bằng lái = photo ID được chấp nhận rộng rãi</td></tr>
      <tr><td class="ven">Address change</td><td class="vvi">Cập nhật địa chỉ mới</td><td class="vex">Thông báo DMV trong 30 ngày khi chuyển nhà</td></tr>
    </table>
  </div>

  <script>
  function svt(id,btn){
    document.querySelectorAll('.vtopic-pane').forEach(p=>p.classList.remove('active'));
    document.querySelectorAll('.vtopic-btn').forEach(b=>b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    btn.classList.add('active');
  }
  </script>
</div>
"""

def signs_html():
    return """<div id="s" class="tab-pane">
  <div class="alert" style="background:#081a10;border:1px solid #15803d;color:#bbf7d0"><div class="alert-icon">🚦</div><div>Biển báo Mỹ theo chuẩn liên bang (MUTCD). Hình dạng và màu sắc là manh mối quan trọng để nhận biết nhanh.</div></div>

  <div class="signs-cat">
    <h3 style="color:#ef4444">🛑 Biển Điều Chỉnh (Regulatory Signs) — Nền Trắng/Đỏ</h3>
    <p style="font-size:12px;color:#64748b;margin-bottom:12px">Bắt buộc tuân thủ — vi phạm bị phạt</p>
    <div class="signs-grid">
      <div class="sign-card"><div class="sign-icon">🛑</div><div class="sign-info"><div class="sign-name">STOP</div><div class="sign-vi">Dừng lại hoàn toàn</div><div class="sign-note">8 cạnh, nền đỏ — dừng TRƯỚC vạch, quan sát, rồi mới đi</div></div></div>
      <div class="sign-card"><div class="sign-icon">🔻</div><div class="sign-info"><div class="sign-name">YIELD</div><div class="sign-vi">Nhường đường</div><div class="sign-note">Tam giác đỏ đầu xuống — nhường xe/người đi bộ có quyền ưu tiên</div></div></div>
      <div class="sign-card"><div class="sign-icon">⬛</div><div class="sign-info"><div class="sign-name">Speed Limit</div><div class="sign-vi">Giới hạn tốc độ</div><div class="sign-note">Chữ đen trên nền trắng — tốc độ TỐI ĐA cho phép (điều kiện lý tưởng)</div></div></div>
      <div class="sign-card"><div class="sign-icon">🚫</div><div class="sign-info"><div class="sign-name">Do Not Enter</div><div class="sign-vi">Cấm vào</div><div class="sign-note">Tròn đỏ, gạch ngang trắng — đang đi ngược chiều</div></div></div>
      <div class="sign-card"><div class="sign-icon">↩️</div><div class="sign-info"><div class="sign-name">Wrong Way</div><div class="sign-vi">Sai chiều</div><div class="sign-note">Thường đi kèm Do Not Enter — quay lại ngay</div></div></div>
      <div class="sign-card"><div class="sign-icon">➡️</div><div class="sign-info"><div class="sign-name">One Way</div><div class="sign-vi">Đường một chiều</div><div class="sign-note">Mũi tên đen trên nền trắng — chỉ đi một hướng</div></div></div>
      <div class="sign-card"><div class="sign-icon">🔄</div><div class="sign-info"><div class="sign-name">No U-Turn</div><div class="sign-vi">Cấm quay đầu xe</div><div class="sign-note">Chữ U với gạch đỏ chéo</div></div></div>
      <div class="sign-card"><div class="sign-icon">🚗</div><div class="sign-info"><div class="sign-name">Keep Right</div><div class="sign-vi">Đi bên phải</div><div class="sign-note">Giữ làn phải, nhường làn trái cho xe vượt</div></div></div>
      <div class="sign-card"><div class="sign-icon">👥</div><div class="sign-info"><div class="sign-name">HOV Lane</div><div class="sign-vi">Làn xe nhiều người</div><div class="sign-note">Chỉ dành cho xe có ≥2 người (carpool) — kiểm tra giờ áp dụng</div></div></div>
      <div class="sign-card"><div class="sign-icon">🅿️</div><div class="sign-info"><div class="sign-name">No Parking</div><div class="sign-vi">Cấm đỗ xe</div><div class="sign-note">Chú ý thời gian và ngày ghi trên biển</div></div></div>
    </div>
  </div>

  <div class="signs-cat">
    <h3 style="color:#f59e0b">⚠️ Biển Cảnh Báo (Warning Signs) — Nền Vàng Kim Cương</h3>
    <p style="font-size:12px;color:#64748b;margin-bottom:12px">Hình thoi (diamond), màu vàng — cảnh báo nguy hiểm phía trước</p>
    <div class="signs-grid">
      <div class="sign-card"><div class="sign-icon">↪️</div><div class="sign-info"><div class="sign-name">Curve Ahead</div><div class="sign-vi">Đường cong phía trước</div><div class="sign-note">Giảm tốc độ trước khi vào đường cong</div></div></div>
      <div class="sign-card"><div class="sign-icon">🦌</div><div class="sign-info"><div class="sign-name">Deer Crossing</div><div class="sign-vi">Khu vực hươu nai qua đường</div><div class="sign-note">Chú ý đặc biệt sáng sớm và chiều tối</div></div></div>
      <div class="sign-card"><div class="sign-icon">🏫</div><div class="sign-info"><div class="sign-name">School Crossing</div><div class="sign-vi">Học sinh qua đường</div><td class="sign-note">Vàng sáng + hình học sinh — chạy chậm và cảnh giác</div></div></div>
      <div class="sign-card"><div class="sign-icon">🚂</div><div class="sign-info"><div class="sign-name">Railroad Crossing</div><div class="sign-vi">Đường giao cắt đường sắt</div><div class="sign-note">Dừng khi đèn đỏ nhấp nháy hoặc cánh chắn hạ xuống</div></div></div>
      <div class="sign-card"><div class="sign-icon">🌊</div><div class="sign-info"><div class="sign-name">Slippery When Wet</div><div class="sign-vi">Đường trơn khi ướt</div><div class="sign-note">Giảm tốc khi mưa, đừng phanh gấp</div></div></div>
      <div class="sign-card"><div class="sign-icon">🔀</div><div class="sign-info"><div class="sign-name">Merging Traffic</div><div class="sign-vi">Có làn nhập vào</div><div class="sign-note">Nhường xe nhập từ bên phải hoặc sẵn sàng nhập</div></div></div>
      <div class="sign-card"><div class="sign-icon">⛰️</div><div class="sign-info"><div class="sign-name">Steep Grade</div><div class="sign-vi">Đường dốc</div><div class="sign-note">Dùng số thấp khi xuống dốc dài — tránh cháy phanh</div></div></div>
      <div class="sign-card"><div class="sign-icon">🚶</div><div class="sign-info"><div class="sign-name">Pedestrian Crossing</div><div class="sign-vi">Người đi bộ qua đường</div><div class="sign-note">Dừng cho người đi bộ tại crosswalk được đánh dấu</div></div></div>
      <div class="sign-card"><div class="sign-icon">🔁</div><div class="sign-info"><div class="sign-name">Roundabout Ahead</div><div class="sign-vi">Vòng xuyến phía trước</div><div class="sign-note">Giảm tốc, nhường xe trong vòng, đi ngược chiều kim đồng hồ</div></div></div>
      <div class="sign-card"><div class="sign-icon">🚧</div><div class="sign-info"><div class="sign-name">Road Narrows</div><div class="sign-vi">Đường thu hẹp</div><div class="sign-note">Giảm tốc và di chuyển sang giữa</div></div></div>
    </div>
  </div>

  <div class="signs-cat">
    <h3 style="color:#22c55e">🟢 Biển Chỉ Dẫn (Guide Signs) — Nền Xanh Lá</h3>
    <p style="font-size:12px;color:#64748b;margin-bottom:12px">Cung cấp thông tin về hướng đi và khoảng cách</p>
    <div class="signs-grid">
      <div class="sign-card"><div class="sign-icon">🛣️</div><div class="sign-info"><div class="sign-name">Interstate Marker</div><div class="sign-vi">Biển số đường interstate</div><div class="sign-note">Hình khiên đỏ/xanh — số chẵn=đường Đông-Tây, lẻ=Bắc-Nam</div></div></div>
      <div class="sign-card"><div class="sign-icon">🚪</div><div class="sign-info"><div class="sign-name">Exit Sign</div><div class="sign-vi">Biển lối ra cao tốc</div><div class="sign-note">Số exit và tên địa điểm — chuyển làn trước ≥1 dặm</div></div></div>
      <div class="sign-card"><div class="sign-icon">🏙️</div><div class="sign-info"><div class="sign-name">Destination Sign</div><div class="sign-vi">Biển chỉ hướng thành phố</div><div class="sign-note">Tên thành phố + khoảng cách (miles)</div></div></div>
      <div class="sign-card"><div class="sign-icon">↕️</div><div class="sign-info"><div class="sign-name">Mile Marker</div><div class="sign-vi">Mốc dặm đường</div><div class="sign-note">Số nhỏ bên lề — dùng khi gọi cứu trợ khẩn cấp</div></div></div>
    </div>
  </div>

  <div class="signs-cat">
    <h3 style="color:#f97316">🟠 Biển Thi Công (Construction Signs) — Nền Cam</h3>
    <p style="font-size:12px;color:#64748b;margin-bottom:12px">Cam — khu vực thi công, phạt GẤP ĐÔI khi vi phạm</p>
    <div class="signs-grid">
      <div class="sign-card"><div class="sign-icon">👷</div><div class="sign-info"><div class="sign-name">Workers Ahead / Flagger</div><div class="sign-vi">Có công nhân / người điều phối phía trước</div><div class="sign-note">Tuân theo hiệu lệnh của flagger (người cầm cờ/biển)</div></div></div>
      <div class="sign-card"><div class="sign-icon">🚧</div><div class="sign-info"><div class="sign-name">Road Work Ahead</div><div class="sign-vi">Thi công đường phía trước</div><div class="sign-note">Giảm tốc — phạt gấp đôi trong work zone</div></div></div>
      <div class="sign-card"><div class="sign-icon">⬇️</div><div class="sign-info"><div class="sign-name">Reduced Speed Zone</div><div class="sign-vi">Khu vực giảm tốc độ</div><div class="sign-note">Hiệu lực từ biển này — không phải từ khu thi công</div></div></div>
      <div class="sign-card"><div class="sign-icon">↔️</div><div class="sign-info"><div class="sign-name">Lane Shift</div><div class="sign-vi">Làn xe bị dịch chuyển</div><div class="sign-note">Chú ý vạch kẻ đường mới — đi theo vạch cam</div></div></div>
    </div>
  </div>

  <div class="signs-cat">
    <h3 style="color:#60a5fa">🔵 Biển Dịch Vụ (Service Signs) — Nền Xanh Dương</h3>
    <p style="font-size:12px;color:#64748b;margin-bottom:12px">Cung cấp thông tin về các dịch vụ có sẵn</p>
    <div class="signs-grid">
      <div class="sign-card"><div class="sign-icon">⛽</div><div class="sign-info"><div class="sign-name">Gas Station</div><div class="sign-vi">Trạm xăng</div><div class="sign-note">Tên hãng thường hiện thêm</div></div></div>
      <div class="sign-card"><div class="sign-icon">🍔</div><div class="sign-info"><div class="sign-name">Food</div><div class="sign-vi">Nhà hàng / thức ăn</div><div class="sign-note">Nhánh exit tiếp theo có nhà hàng</div></div></div>
      <div class="sign-card"><div class="sign-icon">🏨</div><div class="sign-info"><div class="sign-name">Lodging</div><div class="sign-vi">Khách sạn / chỗ ngủ</div><div class="sign-note">Motel hoặc hotel ở exit gần nhất</div></div></div>
      <div class="sign-card"><div class="sign-icon">🏥</div><div class="sign-info"><div class="sign-name">Hospital</div><div class="sign-vi">Bệnh viện</div><div class="sign-note">Có chữ H — chỉ đường đến ER khẩn cấp</div></div></div>
      <div class="sign-card"><div class="sign-icon">ℹ️</div><div class="sign-info"><div class="sign-name">Rest Area / Visitor Center</div><div class="sign-vi">Khu nghỉ ngơi / trung tâm thông tin</div><div class="sign-note">Có nhà vệ sinh, bàn picnic — nghỉ miễn phí</div></div></div>
    </div>
  </div>
</div>
"""

# ─── RULES HTML GENERATOR ────────────────────────────────────────────────────

def rules_html(s, abbr_upper):
    extras_html = "".join(
        f'<li><b>{e[0]}:</b> {e[1]}</li>\n' for e in s["extras"]
    )
    return f"""<div id="r" class="tab-pane">
  <div class="info-box"><h3>🚦 Tốc Độ — {s["name"]} ({abbr_upper})</h3><ul>
    <li><b>Khu dân cư:</b> <b>{s["speed_res"]} mph</b> (trừ khi có biển khác)</li>
    <li><b>Khu trường học:</b> <b>{s["speed_school"]} mph</b> khi đèn nhấp nháy hoặc có học sinh</li>
    <li><b>Đường nông thôn / rural:</b> <b>{s["speed_rural"]} mph</b></li>
    <li><b>Interstate / Freeway:</b> <b>{s["speed_hwy"]} mph</b> (kiểm tra biển — có thể thay đổi)</li>
    <li><b>Khu thi công (Work zone):</b> Theo biển — phạt GẤP ĐÔI khi có công nhân</li>
    <li><b>Nguyên tắc Basic Speed:</b> Lái tốc độ AN TOÀN cho điều kiện, dù thấp hơn giới hạn</li>
  </ul></div>

  <div class="info-box"><h3>🍺 DUI / Nồng Độ Cồn — {s["name"]}</h3><ul>
    <li><b>Người lớn (21+):</b> BAC {s["dui_adult"]} = DUI</li>
    <li><b>Dưới 21 tuổi:</b> BAC {s["dui_under21"]} = DUI (zero tolerance nghiêm khắc hơn)</li>
    <li><b>CDL (Commercial):</b> BAC {s["dui_cdl"]} = DUI — nghiêm hơn người thường</li>
    <li><b>Implied consent:</b> Xin bằng lái {abbr_upper} = đồng ý kiểm tra cồn khi cảnh sát yêu cầu</li>
    <li><b>Hậu quả:</b> Mất bằng · Phạt tiền nặng · Có thể đi tù · SR-22 insurance</li>
  </ul></div>

  <div class="info-box"><h3>📱 Điện Thoại &amp; Sao Nhãng</h3><ul>
    <li><b>Quy định {abbr_upper}:</b> {s["phone"]}</li>
    <li><b>Hands-free được phép:</b> Bluetooth, speaker (không cầm tay)</li>
    <li><b>Work/School zone:</b> Phạt nặng hơn khi vi phạm trong khu vực đặc biệt</li>
    <li><b>Nguyên tắc:</b> Điện thoại → để túi/hộc xe → không nhìn/cầm khi lái</li>
  </ul></div>

  <div class="info-box"><h3>⚖️ Quyền Ưu Tiên (Right of Way)</h3><ul>
    <li><b>Tại ngã tư không có biển:</b> Xe đến trước đi trước · Đến cùng lúc: nhường xe bên phải</li>
    <li><b>Tại vòng xuyến:</b> Xe đang trong vòng có ưu tiên — xe ngoài nhường</li>
    <li><b>Người đi bộ tại crosswalk:</b> Người đi bộ LUÔN có ưu tiên</li>
    <li><b>Xe khẩn cấp (còi/đèn đỏ xanh):</b> Chuyển sang lề phải và dừng lại</li>
    <li><b>Khi nhập làn:</b> Xe đang trong làn chính có ưu tiên</li>
    <li><b>Quẹo trái:</b> Nhường xe ngược chiều và người đi bộ</li>
  </ul></div>

  <div class="info-box"><h3>🚌 Dây An Toàn &amp; Xe Buýt Trường Học</h3><ul>
    <li><b>Dây an toàn:</b> BẮT BUỘC cho lái xe và tất cả hành khách</li>
    <li><b>Trẻ em:</b> Car seat (đến ~40 lbs) → Booster seat → Dây thường</li>
    <li><b>Xe buýt trường học dừng:</b> Đèn đỏ nhấp nháy + cánh chắn = DỪNG cả 2 chiều</li>
    <li><b>Ngoại lệ xe buýt:</b> Đường có dải phân cách (divided highway) — chiều ngược không phải dừng</li>
    <li><b>Cánh chắn thu lại:</b> Chờ xe buýt di chuyển hẳn rồi mới đi</li>
  </ul></div>

  <div class="info-box"><h3>🛡️ Quy Định Đặc Thù — {s["name"]}</h3><ul>
    <li><b>Mũ bảo hiểm xe máy:</b> {s["helmet"]}</li>
    <li><b>Xi nhan trước khi rẽ:</b> Bật ít nhất {s["signal_ft"]} trước điểm rẽ</li>
    <li><b>Khoảng cách an toàn:</b> {s["follow"]}</li>
    <li><b>Bảo hiểm tối thiểu:</b> {s["insurance"]}</li>
{extras_html}  </ul></div>
</div>
"""

# ─── VARIANT BUILDERS ────────────────────────────────────────────────────────

def signs_html_showTab():
    """Signs tab using showTab() function (FL, GA, TX variant)."""
    return signs_html().replace('<div id="s" class="tab-pane">', '<div id="signs" class="tab-pane">')

def vocab_html_showTab():
    """Vocab tab using showTab() function (FL, GA, TX variant)."""
    return vocab_html().replace('<div id="v" class="tab-pane">', '<div id="vocab" class="tab-pane">')

def rules_html_showTab(s, abbr_upper):
    """Rules tab for showTab() variant (FL, GA, TX)."""
    return rules_html(s, abbr_upper).replace('<div id="r" class="tab-pane">', '<div id="rules" class="tab-pane">')

# ─── NAV-TABS BUILDERS ───────────────────────────────────────────────────────

def new_nav_tabs_st(abbr_upper):
    return f"""<div class="nav-tabs">
  <button class="active" onclick="st('i',this)">📋 Thông Tin</button>
  <button onclick="st('v',this)">📖 Từ Vựng</button>
  <button onclick="st('r',this)">📜 Luật {abbr_upper}</button>
  <button onclick="st('s',this)">🚦 Biển Báo</button>
  <button onclick="st('q',this)">🎯 Thi Thử</button>
</div>"""

def new_nav_tabs_showTab(abbr_upper):
    return f"""<div class="nav-tabs">
  <button class="active" onclick="showTab('info',this)">📋 Thông Tin</button>
  <button onclick="showTab('vocab',this)">📖 Từ Vựng</button>
  <button onclick="showTab('rules',this)">📜 Luật {abbr_upper}</button>
  <button onclick="showTab('signs',this)">🚦 Biển Báo</button>
  <button onclick="showTab('quiz',this)">🎯 Thi Thử</button>
</div>"""

# ─── UPGRADE LOGIC ───────────────────────────────────────────────────────────

def upgrade_st_page(content, s, abbr_upper):
    """Upgrade Group A pages (st() function, i/r/q IDs)."""
    # 1. Add CSS (skip if already added)
    if "vtopic-tabs" not in content:
        content = content.replace("</style>", VOCAB_CSS + "\n</style>", 1)

    # 2. Replace nav-tabs (skip if already has 5 buttons)
    if 'onclick="st(\'v\'' not in content:
        content = re.sub(
            r'<div class="nav-tabs">.*?</div>',
            new_nav_tabs_st(abbr_upper),
            content, count=1, flags=re.DOTALL
        )

    # 3. Update "start quiz" button index (was [2], now [4])
    content = content.replace(
        "document.querySelectorAll('.nav-tabs button')[2]",
        "document.querySelectorAll('.nav-tabs button')[4]"
    )

    # 4. Split at quiz tab — support both class="tab-pane" and class="pane"
    quiz_marker = '<div id="q" class="tab-pane">'
    if quiz_marker not in content:
        quiz_marker = '<div id="q" class="pane">'
    if quiz_marker not in content:
        print(f"  WARN: quiz marker not found in {abbr_upper}")
        return content

    parts = content.split(quiz_marker, 1)
    before_quiz = parts[0]
    quiz_and_after = quiz_marker + parts[1]

    # 5. Find rules start and split — support both class names
    rules_marker = '<div id="r" class="tab-pane">'
    if rules_marker not in before_quiz:
        rules_marker = '<div id="r" class="pane">'
    if rules_marker not in before_quiz:
        print(f"  WARN: rules marker not found in {abbr_upper}")
        return content

    rules_start = before_quiz.index(rules_marker)
    header_and_i = before_quiz[:rules_start]

    # 6. Build new content
    return (
        header_and_i
        + rules_html(s, abbr_upper)
        + "\n"
        + vocab_html()
        + "\n"
        + signs_html()
        + "\n"
        + quiz_and_after
    )


def upgrade_showTab_page(content, s, abbr_upper):
    """Upgrade Group B pages (showTab() function, info/rules/quiz IDs)."""
    # 1. Add CSS
    content = content.replace("</style>", VOCAB_CSS + "\n</style>", 1)

    # 2. Replace nav-tabs
    content = re.sub(
        r'<div class="nav-tabs">.*?</div>',
        new_nav_tabs_showTab(abbr_upper),
        content, count=1, flags=re.DOTALL
    )

    # 3. Update "start quiz" button index
    content = content.replace(
        "document.querySelectorAll('.nav-tabs button')[2]",
        "document.querySelectorAll('.nav-tabs button')[4]"
    )

    # 4. Split at quiz tab
    quiz_marker = '<div id="quiz" class="tab-pane">'
    if quiz_marker not in content:
        print(f"  WARN: quiz marker not found in {abbr_upper}")
        return content

    parts = content.split(quiz_marker, 1)
    before_quiz = parts[0]
    quiz_and_after = quiz_marker + parts[1]

    # 5. Find rules start and split
    rules_marker = '<div id="rules" class="tab-pane">'
    if rules_marker not in before_quiz:
        print(f"  WARN: rules marker not found in {abbr_upper}")
        return content

    rules_start = before_quiz.index(rules_marker)
    header_and_info = before_quiz[:rules_start]

    # 6. Build new content
    return (
        header_and_info
        + rules_html_showTab(s, abbr_upper)
        + "\n"
        + vocab_html_showTab()
        + "\n"
        + signs_html_showTab()
        + "\n"
        + quiz_and_after
    )


# ─── MAIN ─────────────────────────────────────────────────────────────────────

SHOWSTAB_STATES = {"fl", "ga", "tx"}

def main():
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    upgraded = 0
    skipped = 0
    errors = 0

    for abbr, s in STATES.items():
        fname = f"bmv-{abbr}.html"
        fpath = os.path.join(project_root, fname)

        if not os.path.exists(fpath):
            print(f"  SKIP (not found): {fname}")
            skipped += 1
            continue

        with open(fpath, encoding="utf-8") as f:
            content = f.read()

        # Already fully upgraded?
        if ('id="v"' in content or 'id="vocab"' in content) and 'vtopic-pane' in content:
            print(f"  SKIP (already fully upgraded): {fname}")
            skipped += 1
            continue

        abbr_upper = s["abbr"]
        try:
            if abbr in SHOWSTAB_STATES:
                new_content = upgrade_showTab_page(content, s, abbr_upper)
            else:
                new_content = upgrade_st_page(content, s, abbr_upper)

            with open(fpath, "w", encoding="utf-8") as f:
                f.write(new_content)

            print(f"  OK: {fname} ({len(content)} → {len(new_content)} bytes)")
            upgraded += 1

        except Exception as e:
            print(f"  ERROR {fname}: {e}")
            errors += 1

    print(f"\nDone: {upgraded} upgraded, {skipped} skipped, {errors} errors")


if __name__ == "__main__":
    main()
