graph TD
    subgraph "Giai đoạn 1: Tiếp nhận & Báo giá"
        A[Khách hàng có yêu cầu dịch vụ] --> B{Hệ thống tiếp nhận yêu cầu<br/>Website, Điện thoại, Email};
        B --> C[Ghi nhận thông tin khách hàng];
        C --> D[Đánh giá phạm vi công việc];
        C --> E[Kiểm tra lịch sử khách hàng];
        C --> F[Tạo Báo giá];
    end

    subgraph "Phê duyệt của Khách hàng"
        F --> G{Khách hàng nhận Báo giá};
        G --> H[Xem trên Cổng thông tin Khách hàng];
        H --> I{Phê duyệt?};
        I -->|Có| J[Xác nhận đồng ý];
        J --> K[Tạo Lệnh công việc];
        I -->|Không| L[Yêu cầu điều chỉnh];
        L --> C;
        I -->|Không phản hồi| M[Hệ thống tự động nhắc nhở];
        M --> G;
    end

    subgraph "Giai đoạn 2: Lập lịch & Điều phối"
        K --> N[Chuyển đến bộ phận điều phối];
        N --> O[Người quản lý/điều phối Lập lịch công việc];
        O --> P[Kiểm tra tình trạng kỹ thuật viên];
        O --> Q[Phân công cho Kỹ thuật viên phù hợp];
        O --> R[Gửi thông báo cho Kỹ thuật viên];
    end

    subgraph "Giai đoạn 3: Thực thi tại Hiện trường"
        R --> S[Kỹ thuật viên nhận thông tin công việc trên App];
        S --> T[Xem chi tiết công việc, lịch sử, ghi chú];
        S --> U[Check-in tại địa điểm];
        U --> V[Thực hiện công việc];
        V --> W[Chụp ảnh trước/sau];
        W --> X[Ghi chú và báo cáo];
        X --> Y[Khách hàng ký xác nhận trên App];
        Y --> Z[Đánh dấu Hoàn thành trên App];
    end

    subgraph "Giai đoạn 4: Lập hóa đơn & Thanh toán"
        Z --> AA[Hệ thống tự động tạo Hóa đơn];
        AA --> AB[Gửi hóa đơn qua Email/SMS];
        AB --> AC{Khách hàng nhận Hóa đơn};
        AC --> AD[Xem và xác nhận hóa đơn];
        AD --> AE{Thanh toán thành công?};
        AE -->|Có| AF[Ghi nhận thanh toán];
        AE -->|Không/Quá hạn| AG[Hệ thống tự động nhắc nợ];
        AG --> AC;
    end

    subgraph "Giai đoạn 5: Chăm sóc sau Dịch vụ & Phân tích"
        AF --> AH[Gửi khảo sát đánh giá dịch vụ];
        AH --> AI[Quản lý yêu cầu bảo hành/hỗ trợ];
        AI --> AJ[Phân tích dữ liệu và báo cáo];
        AJ --> AK[Cải thiện quy trình];
    end

    style C fill:#f9f,stroke:#333,stroke-width:2px
    style N fill:#ccf,stroke:#333,stroke-width:2px
    style Z fill:#cfc,stroke:#333,stroke-width:2px
    style AA fill:#cfc,stroke:#333,stroke-width:2px
    style AF fill:#cfc,stroke:#333,stroke-width:2px