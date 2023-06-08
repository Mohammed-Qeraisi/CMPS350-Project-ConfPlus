import repo from "./papers-repo";

export async function GET(request) {
    try {
        const papers = await repo.getPapers();
        return Response.json(papers);
    } catch (error) {
        console.log(error);
        return Response.json({
            errorMessage: error.name + " | " + error.message,
        });
    }
}

export async function POST(request) {
    try {
        const paper = await request.json();
        const newPaper = await repo.addPaper(paper);
        return Response.json(newPaper);
    } catch (error) {
        console.log(error);
        return Response.json({
            errorMessage: error.name + " | " + error.message,
        });
    }
}

export async function PUT(request) {
    try {
        const updatedPaper = await request.json();
        const response = await repo.updatePaper(updatedPaper);
        return Response.json(response);
    } catch (error) {
        console.log(error);
        return Response.json({
            errorMessage: error.name + " | " + error.message,
        });
    }
}
