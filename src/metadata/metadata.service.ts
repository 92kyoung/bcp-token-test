import { Injectable } from '@nestjs/common';

@Injectable()
export class MetadataService {
    // 이미지 업로드
    async uploadImage(file: Express.Multer.File): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!file) {
                return reject(new Error('No file provided'));
            }
            const imageUrl = `https://example.com/images/${file.filename}`;
            resolve(imageUrl);
        });
    }

    // 메타데이터 저장
    async saveMetadata(metadata: any): Promise<void> {
        // await this.prisma.metadata.create({ data: metadata });
        console.log('Metadata saved:', metadata);
    }
}
