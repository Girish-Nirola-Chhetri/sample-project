import { getGithubApp } from "@/features/github/utils/github-app"

type PrFiles = {
    filePath: string
    patch: string
}

const FILES_PER_PAGE = 100

export async function getPullRequestFiles (
    installationId: number, repoFullName: string, prNumber: number 
): Promise<PrFiles[]> {

    const app = getGithubApp()
    const octakit = await app.getInstallationOctokit( installationId )
    const [ owner, repo ] = repoFullName.split("/")

    const { data } = await octakit.request(
        "GET /repos/{owner}/{repo}/pulls/{pull_number}/files",
        {owner, repo, pull_number: prNumber, per_page: FILES_PER_PAGE }
    )

    const files: PrFiles[] = [];

    for ( const file of data ) {
        if( !file.patch ){
            continue
        }

        files.push({ filePath: file.filename, patch: file.patch });
    }

    return files
}

export function formatPrFilesForReview( files: PrFiles[]) : string {
    return files
        .map(
            (file) =>
                `### ${file.filePath}\n\`\`\`diff\n${file.patch}\n\`\`\``
        )
        .join("\n\n");
}